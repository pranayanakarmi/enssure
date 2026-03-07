<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHomeGallerySectionItemRequest;
use App\Http\Requests\Admin\UpdateHomeGallerySectionItemRequest;
use App\Models\HomeGallerySection;
use App\Models\HomeGallerySectionItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeGallerySectionItemController extends Controller
{
    public function store(StoreHomeGallerySectionItemRequest $request): RedirectResponse
    {
        $section = HomeGallerySection::first();
        $this->authorize('update', $section);

        $data = $request->validated();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('home-gallery-section-items', 'public');
        } else {
            unset($data['image']);
        }
        $data['home_gallery_section_id'] = $section->id;
        $section->items()->create($data);

        return back()->with('success', 'Gallery item added.');
    }

    public function edit(HomeGallerySectionItem $home_gallery_section_item): Response
    {
        $this->authorize('update', $home_gallery_section_item);

        $home_gallery_section_item->load('homeGallerySection');

        return Inertia::render('admin/home_gallery_section_items/edit', [
            'homeGallerySectionItem' => [
                'id' => $home_gallery_section_item->id,
                'image_url' => $home_gallery_section_item->image
                    ? Storage::disk('public')->url($home_gallery_section_item->image)
                    : null,
                'text' => $home_gallery_section_item->text,
                'order' => $home_gallery_section_item->order,
            ],
            'section' => [
                'id' => $home_gallery_section_item->homeGallerySection->id,
            ],
        ]);
    }

    public function update(UpdateHomeGallerySectionItemRequest $request, HomeGallerySectionItem $home_gallery_section_item): RedirectResponse
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            if ($home_gallery_section_item->image) {
                Storage::disk('public')->delete($home_gallery_section_item->image);
            }
            $data['image'] = $request->file('image')->store('home-gallery-section-items', 'public');
        } else {
            unset($data['image']);
        }
        $home_gallery_section_item->update($data);

        return redirect()->route('admin.home_gallery_sections.edit')
            ->with('success', 'Gallery item updated.');
    }

    public function destroy(HomeGallerySectionItem $home_gallery_section_item): RedirectResponse
    {
        $this->authorize('delete', $home_gallery_section_item);

        if ($home_gallery_section_item->image) {
            Storage::disk('public')->delete($home_gallery_section_item->image);
        }
        $home_gallery_section_item->delete();

        return back()->with('success', 'Gallery item removed.');
    }
}
