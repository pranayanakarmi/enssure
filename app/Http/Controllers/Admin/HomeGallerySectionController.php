<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeGallerySectionRequest;
use App\Models\Gallery;
use App\Models\HomeGallerySection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeGallerySectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeGallerySection::first()
            ?? HomeGallerySection::create([
                'badge_text' => 'Gallery',
                'title' => 'The ENSSURE Journey in Pictures',
                'description' => 'This section provides a visual record of our activities and outcomes. See the faces, places, and practical work that define the federalised TVET system we support.',
                'cta_text' => 'View all gallery',
                'cta_url' => '#',
            ]);

        $this->authorize('update', $section);

        $section->load('galleries');

        $galleryIds = $section->galleries->pluck('id')->values()->all();

        $allGalleries = Gallery::query()->orderBy('title')->get()->map(fn ($gallery) => [
            'id' => $gallery->id,
            'title' => $gallery->title,
            'slug' => $gallery->slug,
            'cover_image_url' => $gallery->cover_image ? Storage::disk('public')->url($gallery->cover_image) : null,
        ])->values()->all();

        return Inertia::render('admin/home_gallery_sections/edit', [
            'homeGallerySection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'description' => $section->description,
                'cta_text' => $section->cta_text,
                'cta_url' => $section->cta_url,
                'gallery_ids' => $galleryIds,
            ],
            'galleries' => $allGalleries,
        ]);
    }

    public function update(UpdateHomeGallerySectionRequest $request): RedirectResponse
    {
        $section = HomeGallerySection::first();

        if (! $section) {
            $section = HomeGallerySection::create($request->safe()->only([
                'badge_text', 'title', 'description', 'cta_text', 'cta_url',
            ]));
            $this->authorize('update', $section);
        } else {
            $this->authorize('update', $section);
            $section->update($request->safe()->only([
                'badge_text', 'title', 'description', 'cta_text', 'cta_url',
            ]));
        }

        $galleryIds = $request->validated('gallery_ids', []);
        $galleryIds = is_array($galleryIds) ? array_values(array_map('intval', array_filter($galleryIds))) : [];
        $sync = collect($galleryIds)->mapWithKeys(fn ($id, $index) => [$id => ['order' => $index]])->all();
        $section->galleries()->sync($sync);

        return back()->with('success', 'Home Gallery section updated successfully.');
    }
}
