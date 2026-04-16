<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReorderDocumentRequest;
use App\Http\Requests\Admin\StoreDocumentRequest;
use App\Http\Requests\Admin\UpdateDocumentRequest;
use App\Models\Document;
use App\Models\DocumentType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Document::class);

        $documents = Document::orderBy('order')
            ->orderBy('title')
            ->get()
            ->map(fn (Document $d) => [
                'id' => $d->id,
                'title' => $d->title,
                'document_type' => $d->document_type,
                'order' => $d->order,
                'file_path' => $d->file_path,
                'file_extension' => $d->file_extension,
                'file_url' => Storage::disk('public')->url($d->file_path),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/documents/index', [
            'documents' => $documents,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Document::class);

        $documentTypes = DocumentType::orderBy('name')->get(['slug', 'name']);

        return Inertia::render('admin/documents/create', [
            'nextOrder' => (int) Document::max('order') + 1,
            'documentTypes' => $documentTypes,
        ]);
    }

    public function store(StoreDocumentRequest $request): RedirectResponse
    {
        $data = $request->safe()->only(['title', 'description', 'document_type', 'order']);
        $file = $request->file('file');

        if (! array_key_exists('order', $data) || $data['order'] === null) {
            $data['order'] = (int) Document::max('order') + 1;
        }

        $data['file_path'] = $file->store('documents', 'public');
        $data['file_size'] = $file->getSize();
        $data['file_extension'] = strtolower($file->getClientOriginalExtension());

        Document::create($data);

        return to_route('admin.documents.index')
            ->with('success', 'Document created successfully.');
    }

    public function edit(Document $document): Response
    {
        $this->authorize('update', $document);

        $d = $document;

        $documentTypes = DocumentType::orderBy('name')->get(['slug', 'name']);

        return Inertia::render('admin/documents/edit', [
            'document' => [
                'id' => $d->id,
                'title' => $d->title,
                'description' => $d->description,
                'document_type' => $d->document_type,
                'order' => $d->order,
                'file_path' => $d->file_path,
                'file_size' => $d->file_size,
                'file_extension' => $d->file_extension,
                'file_url' => Storage::disk('public')->url($d->file_path),
            ],
            'documentTypes' => $documentTypes,
        ]);
    }

    public function update(UpdateDocumentRequest $request, Document $document): RedirectResponse
    {
        $data = $request->safe()->only(['title', 'description', 'document_type', 'order']);

        if ($request->hasFile('file')) {
            $file = $request->file('file');

            if ($document->file_path) {
                Storage::disk('public')->delete($document->file_path);
            }

            $data['file_path'] = $file->store('documents', 'public');
            $data['file_size'] = $file->getSize();
            $data['file_extension'] = strtolower($file->getClientOriginalExtension());
        }

        $document->update($data);

        return to_route('admin.documents.index')
            ->with('success', 'Document updated successfully.');
    }

    public function reorder(ReorderDocumentRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request): void {
            foreach ($request->validated('documents') as $row) {
                Document::whereKey($row['id'])->update(['order' => (int) $row['order']]);
            }
        });

        return to_route('admin.documents.index')
            ->with('success', 'Document order updated successfully.');
    }

    public function destroy(Document $document): RedirectResponse
    {
        $this->authorize('delete', $document);

        if ($document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return to_route('admin.documents.index')
            ->with('success', 'Document deleted successfully.');
    }
}
