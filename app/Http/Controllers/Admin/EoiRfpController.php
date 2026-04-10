<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EoiRfp;
use App\Models\EoiRfpDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EoiRfpController extends Controller
{
    public function index(Request $request)
{
    $this->authorize('viewAny', EoiRfp::class);
    $items = EoiRfp::orderBy('order')
        ->get()
        ->map(fn ($item) => [
            'id' => $item->id,
            'type' => $item->type,
            'title' => $item->title,
            'slug' => $item->slug,
            'deadline' => $item->deadline?->toDateString(),
            'status' => $item->status,
            'published_at' => $item->published_at?->toDateString(),
            'order' => $item->order,
        ]);
    return Inertia::render('admin/eoi-rfp/index', ['items' => $items]);
}

    public function create(Request $request)
    {
        $this->authorize('create', EoiRfp::class);
        $type = $request->query('type', 'eoi');
        return Inertia::render('admin/eoi-rfp/create', ['type' => $type]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', EoiRfp::class);
        $data = $request->validate([
            'type' => 'required|in:eoi,rfp',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:eoi_rfps',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
            'external_url' => 'nullable|url|max:255',
            'status' => 'required|in:draft,published,closed',
            'published_at' => 'nullable|date',
            'order' => 'nullable|integer|min:0',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        $eoiRfp = EoiRfp::create($data);

        // Handle multiple documents
        if ($request->hasFile('documents')) {
            $order = 0;
            foreach ($request->file('documents') as $file) {
                $path = $file->store('eoi-rfp-docs', 'public');
                $eoiRfp->documents()->create([
                    'label' => $file->getClientOriginalName(),
                    'file_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'order' => $order++,
                ]);
            }
        }

        return redirect()->route('admin.eoi-rfp.index', ['type' => $data['type']])
            ->with('success', ucfirst($data['type']) . ' created.');
    }

    public function edit(EoiRfp $eoi_rfp)
    {
        $this->authorize('update', $eoi_rfp);
        $eoi_rfp->load('documents');
        return Inertia::render('admin/eoi-rfp/edit', [
            'item' => $eoi_rfp,
        ]);
    }

    public function update(Request $request, EoiRfp $eoi_rfp)
    {
        $this->authorize('update', $eoi_rfp);
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:eoi_rfps,slug,' . $eoi_rfp->id,
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
            'external_url' => 'nullable|url|max:255',
            'status' => 'required|in:draft,published,closed',
            'published_at' => 'nullable|date',
            'order' => 'nullable|integer|min:0',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        $eoi_rfp->update($data);

        // Remove documents
        if ($request->has('remove_document_ids')) {
            $ids = $request->remove_document_ids;
            $docs = EoiRfpDocument::whereIn('id', $ids)->get();
            foreach ($docs as $doc) {
                Storage::disk('public')->delete($doc->file_path);
                $doc->delete();
            }
        }

        // Add new documents
        if ($request->hasFile('documents')) {
            $order = $eoi_rfp->documents()->max('order') + 1;
            foreach ($request->file('documents') as $file) {
                $path = $file->store('eoi-rfp-docs', 'public');
                $eoi_rfp->documents()->create([
                    'label' => $file->getClientOriginalName(),
                    'file_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'order' => $order++,
                ]);
            }
        }

        return redirect()->route('admin.eoi-rfp.index', ['type' => $eoi_rfp->type])
            ->with('success', ucfirst($eoi_rfp->type) . ' updated.');
    }

    public function destroy(EoiRfp $eoi_rfp)
    {
        $this->authorize('delete', $eoi_rfp);
        foreach ($eoi_rfp->documents as $doc) {
            Storage::disk('public')->delete($doc->file_path);
        }
        $eoi_rfp->delete();
        return back()->with('success', 'Deleted.');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:eoi_rfps,id',
            'items.*.order' => 'required|integer|min:0',
        ]);
        foreach ($request->input('items') as $item) {
            EoiRfp::where('id', $item['id'])->update(['order' => $item['order']]);
        }
        return back()->with('success', 'Order updated.');
    }
}
