<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGalleryImageRequest;
use App\Http\Requests\Admin\UpdateGalleryImageRequest;
use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;

class GalleryImageController extends Controller
{
    public function store(StoreGalleryImageRequest $request, Gallery $gallery): RedirectResponse
    {
        $gallery->images()->create($request->validated());

        return back()->with('success', 'Image added.');
    }

    public function update(UpdateGalleryImageRequest $request, GalleryImage $gallery_image): RedirectResponse
    {
        $gallery_image->update($request->validated());

        return back()->with('success', 'Image updated.');
    }

    public function destroy(GalleryImage $gallery_image): RedirectResponse
    {
        $this->authorize('delete', $gallery_image);

        $gallery_image->delete();

        return back()->with('success', 'Image deleted.');
    }
}
