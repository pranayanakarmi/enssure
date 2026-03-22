<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreInfographicRequest;
use App\Http\Requests\Admin\UpdateInfographicRequest;
use App\Models\Infographic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class InfographicController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Infographic::class);

        $infographics = Infographic::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Infographic $row) => [
                'id' => $row->id,
                'title' => $row->title,
                'sort_order' => $row->sort_order,
                'image_url' => Storage::disk('public')->url($row->image),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/infographics/index', [
            'infographics' => $infographics,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Infographic::class);

        return Inertia::render('admin/infographics/create');
    }

    public function store(StoreInfographicRequest $request): RedirectResponse
    {
        Infographic::create([
            'title' => $request->validated('title'),
            'sort_order' => (int) $request->input('sort_order', 0),
            'image' => $request->file('image')->store('infographics', 'public'),
        ]);

        return to_route('admin.infographics.index')
            ->with('success', 'Infographic created successfully.');
    }

    public function edit(Infographic $infographic): Response
    {
        $this->authorize('update', $infographic);

        return Inertia::render('admin/infographics/edit', [
            'infographic' => [
                'id' => $infographic->id,
                'title' => $infographic->title,
                'sort_order' => $infographic->sort_order,
                'image_url' => Storage::disk('public')->url($infographic->image),
            ],
        ]);
    }

    public function update(UpdateInfographicRequest $request, Infographic $infographic): RedirectResponse
    {
        $data = [
            'title' => $request->validated('title'),
            'sort_order' => (int) $request->input('sort_order', $infographic->sort_order),
        ];

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($infographic->image);
            $data['image'] = $request->file('image')->store('infographics', 'public');
        }

        $infographic->update($data);

        return to_route('admin.infographics.index')
            ->with('success', 'Infographic updated successfully.');
    }

    public function destroy(Infographic $infographic): RedirectResponse
    {
        $this->authorize('delete', $infographic);

        Storage::disk('public')->delete($infographic->image);
        $infographic->delete();

        return to_route('admin.infographics.index')
            ->with('success', 'Infographic deleted successfully.');
    }
}
