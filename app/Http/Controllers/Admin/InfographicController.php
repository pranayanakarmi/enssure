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
            ->orderBy('slug')
            ->orderBy('id')
            ->get()
            ->map(fn (Infographic $row) => [
                'id' => $row->id,
                'slug' => $row->slug,
                'label' => $row->displayLabel(),
                'public_url' => url()->route('infographics.show', $row),
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
        $validated = $request->validated();

        Infographic::create([
            'title' => $validated['title'],
            'slug' => Infographic::generateUniqueSlug($validated['slug']),
        ]);

        return to_route('admin.infographics.index')
            ->with('success', 'Infographic created successfully.');
    }

    public function edit(Infographic $infographic): Response
    {
        $this->authorize('update', $infographic);
        $infographic->load(['items']);

        return Inertia::render('admin/infographics/edit', [
            'infographic' => [
                'id' => $infographic->id,
                'title' => $infographic->title ?? '',
                'slug' => $infographic->slug,
                'label' => $infographic->displayLabel(),
                'public_url' => url()->route('infographics.show', $infographic),
                'items' => $infographic->items->map(fn ($item) => [
                    'id' => $item->id,
                    'title' => $item->title,
                    'sort_order' => $item->sort_order,
                    'image_url' => Storage::disk('public')->url($item->image),
                ])->values()->all(),
            ],
        ]);
    }

    public function update(UpdateInfographicRequest $request, Infographic $infographic): RedirectResponse
    {
        $validated = $request->validated();

        $infographic->update([
            'title' => $validated['title'],
            'slug' => Infographic::generateUniqueSlug($validated['slug'], $infographic->id),
        ]);

        return to_route('admin.infographics.index')
            ->with('success', 'Infographic updated successfully.');
    }

    public function destroy(Infographic $infographic): RedirectResponse
    {
        $this->authorize('delete', $infographic);
        $infographic->delete();

        return to_route('admin.infographics.index')
            ->with('success', 'Infographic deleted successfully.');
    }
}
