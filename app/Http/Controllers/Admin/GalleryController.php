<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGalleryRequest;
use App\Http\Requests\Admin\UpdateGalleryRequest;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Gallery::class);

        $galleries = Gallery::withCount('images')
            ->orderBy('event_date', 'desc')
            ->get()
            ->map(fn (Gallery $g) => [
                'id' => $g->id,
                'title' => $g->title,
                'slug' => $g->slug,
                'event_date' => $g->event_date?->toDateString(),
                'images_count' => $g->images_count,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/galleries/index', [
            'galleries' => $galleries,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Gallery::class);

        return Inertia::render('admin/galleries/create');
    }

    public function store(StoreGalleryRequest $request): RedirectResponse
    {
        Gallery::create($request->validated());

        return to_route('admin.galleries.index')
            ->with('success', 'Gallery created successfully.');
    }

    public function edit(Gallery $gallery): Response
    {
        $this->authorize('update', $gallery);

        $gallery->load(['images' => fn ($q) => $q->orderBy('order')]);

        return Inertia::render('admin/galleries/edit', [
            'gallery' => [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'slug' => $gallery->slug,
                'description' => $gallery->description,
                'event_date' => $gallery->event_date?->toDateString(),
                'images' => $gallery->images->map(fn ($i) => [
                    'id' => $i->id,
                    'image_path' => $i->image_path,
                    'caption' => $i->caption,
                    'order' => $i->order,
                ])->values()->all(),
            ],
        ]);
    }

    public function update(UpdateGalleryRequest $request, Gallery $gallery): RedirectResponse
    {
        $gallery->update($request->validated());

        return to_route('admin.galleries.index')
            ->with('success', 'Gallery updated successfully.');
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        $this->authorize('delete', $gallery);

        $gallery->delete();

        return to_route('admin.galleries.index')
            ->with('success', 'Gallery deleted successfully.');
    }
}
