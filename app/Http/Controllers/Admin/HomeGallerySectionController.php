<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeGallerySectionRequest;
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

        $section->load(['items' => fn ($q) => $q->orderBy('order')]);

        $items = $section->items->map(fn ($item) => [
            'id' => $item->id,
            'image_url' => $item->image ? Storage::disk('public')->url($item->image) : null,
            'text' => $item->text,
            'order' => $item->order,
        ])->values()->all();

        return Inertia::render('admin/home_gallery_sections/edit', [
            'homeGallerySection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'description' => $section->description,
                'cta_text' => $section->cta_text,
                'cta_url' => $section->cta_url,
                'items' => $items,
            ],
        ]);
    }

    public function update(UpdateHomeGallerySectionRequest $request): RedirectResponse
    {
        $section = HomeGallerySection::first();

        if (! $section) {
            $section = HomeGallerySection::create($request->validated());
            $this->authorize('update', $section);

            return back()->with('success', 'Home Gallery section created successfully.');
        }

        $this->authorize('update', $section);

        $section->update($request->validated());

        return back()->with('success', 'Home Gallery section updated successfully.');
    }
}
