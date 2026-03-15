<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGalleryRequest;
use App\Http\Requests\Admin\UpdateGalleryRequest;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Gallery::class);

        $galleries = Gallery::withCount('images')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Gallery $g) => [
                'id' => $g->id,
                'title' => $g->title,
                'slug' => $g->slug,
                'images_count' => $g->images_count,
                'cover_image_url' => $g->cover_image
                    ? Storage::disk('public')->url($g->cover_image)
                    : null,
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
        $data = collect($request->validated())->except(['cover_image'])->all();

        if (empty($data['slug'])) {
            $data['slug'] = $this->uniqueSlug(Str::slug($data['title']));
        }

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('galleries', 'public');
        }

        Gallery::create($data);

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
                'cover_image_url' => $gallery->cover_image
                    ? Storage::disk('public')->url($gallery->cover_image)
                    : null,
                'images' => $gallery->images->map(fn ($i) => [
                    'id' => $i->id,
                    'image_path' => $i->image_path,
                    'image_url' => $i->image_path
                        ? Storage::disk('public')->url($i->image_path)
                        : null,
                    'caption' => $i->caption,
                    'order' => $i->order,
                ])->values()->all(),
            ],
        ]);
    }

    public function update(UpdateGalleryRequest $request, Gallery $gallery): RedirectResponse
    {
        $data = collect($request->validated())->except(['remove_cover_image'])->all();

        if ($request->boolean('remove_cover_image') && $gallery->cover_image) {
            Storage::disk('public')->delete($gallery->cover_image);
            $data['cover_image'] = null;
        } elseif ($request->hasFile('cover_image')) {
            if ($gallery->cover_image) {
                Storage::disk('public')->delete($gallery->cover_image);
            }
            $data['cover_image'] = $request->file('cover_image')->store('galleries', 'public');
        } else {
            unset($data['cover_image']);
        }

        if (empty($data['slug'])) {
            $data['slug'] = $this->uniqueSlug(Str::slug($data['title']), $gallery->id);
        }

        $gallery->update($data);

        return to_route('admin.galleries.index')
            ->with('success', 'Gallery updated successfully.');
    }

    private function uniqueSlug(string $slug, ?int $ignoreId = null): string
    {
        $base = $slug;
        $i = 1;
        while ($this->slugExists($slug, $ignoreId)) {
            $slug = $base.'-'.$i;
            $i++;
        }

        return $slug;
    }

    private function slugExists(string $slug, ?int $ignoreId): bool
    {
        $query = Gallery::query()->where('slug', $slug);
        if ($ignoreId !== null) {
            $query->where('id', '!=', $ignoreId);
        }

        return $query->exists();
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        $this->authorize('delete', $gallery);

        $gallery->delete();

        return to_route('admin.galleries.index')
            ->with('success', 'Gallery deleted successfully.');
    }
}
