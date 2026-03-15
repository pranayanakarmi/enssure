<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateGalleryPageSectionRequest;
use App\Models\GalleryPageSection;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GalleryPageSectionController extends Controller
{
    public function edit(): Response
    {
        $section = GalleryPageSection::first()
            ?? GalleryPageSection::create([
                'title' => 'The ENSSURE Journey in Pictures',
                'description' => 'This section provides a visual record of our activities and outcomes. See the faces, places, and practical work that define the federalised TVET system we support.',
            ]);

        $this->authorize('update', $section);

        return Inertia::render('admin/gallery_page_section/edit', [
            'galleryPageSection' => [
                'id' => $section->id,
                'title' => $section->title,
                'description' => $section->description,
            ],
        ]);
    }

    public function update(UpdateGalleryPageSectionRequest $request): RedirectResponse
    {
        $section = GalleryPageSection::first();

        if (! $section) {
            $section = GalleryPageSection::create($request->validated());
            $this->authorize('update', $section);

            return back()->with('success', 'Gallery page section created successfully.');
        }

        $this->authorize('update', $section);

        $section->update($request->validated());

        return back()->with('success', 'Gallery page section updated successfully.');
    }
}
