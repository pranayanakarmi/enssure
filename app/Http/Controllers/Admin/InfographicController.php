<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreInfographicRequest;
use App\Http\Requests\Admin\UpdateInfographicRequest;
use App\Models\Infographic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class InfographicController extends Controller
{
    public function dashboard(): Response
    {
        $infographics = Infographic::with('items')
            ->orderBy('sort_order')
            ->get()
            ->map(fn($inf) => [
                'id' => $inf->id,
                'title' => $inf->title,
                'hero_title' => $inf->hero_title,
                'slug' => $inf->slug,
                'description' => $inf->description,
                'image_url' => $inf->thumbnail_url,
                'url' => $inf->url,
                'meta_title' => $inf->meta_title,
                'meta_description' => $inf->meta_description,
                'is_published' => $inf->is_published,
                'sort_order' => $inf->sort_order,
                'banner_url' => $inf->banner_url,
                'public_url' => $inf->public_url,
                'items' => $inf->items->map(fn($item) => [
                    'id' => $item->id,
                    'title' => $item->title,
                    'image_url' => $item->image_url,
                    'alt_text' => $item->alt_text,
                    'sort_order' => $item->sort_order,
                ]),
            ]);

        return Inertia::render('admin/infographics/index', [
            'infographics' => $infographics,
        ]);
    }

    public function store(StoreInfographicRequest $request): RedirectResponse
{
    try {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('infographics', 'public');
        }
        if ($request->hasFile('banner_image')) {
            $data['banner_image'] = $request->file('banner_image')->store('infographics-banners', 'public');
        }

        $data['slug'] = Infographic::generateUniqueSlug($data['slug']);
        Infographic::create($data);

        return back()->with('success', 'Infographic created successfully.');

    } catch (\Exception $e) {
        // Optional: Log the error for debugging
        // \Log::error('Infographic creation failed: ' . $e->getMessage());

        return back()->with('error', 'Failed to create infographic. Please try again.');
    }
}

    public function update(UpdateInfographicRequest $request, Infographic $infographic): RedirectResponse
    {
        $data = $request->validated();

        // Handle banner removal
        if ($request->boolean('remove_banner') && $infographic->banner_image) {
            Storage::disk('public')->delete($infographic->banner_image);
            $data['banner_image'] = null;
        } elseif ($request->hasFile('banner_image')) {
            if ($infographic->banner_image) {
                Storage::disk('public')->delete($infographic->banner_image);
            }
            $data['banner_image'] = $request->file('banner_image')->store('infographics-banners', 'public');
        } else {
            unset($data['banner_image']);
        }

        // Handle thumbnail image
        if ($request->hasFile('image')) {
            if ($infographic->image) {
                Storage::disk('public')->delete($infographic->image);
            }
            $data['image'] = $request->file('image')->store('infographics', 'public');
        } else {
            unset($data['image']);
        }

        unset($data['remove_banner']);
        $infographic->update($data);

        return back()->with('success', 'Infographic updated.');
    }

    public function destroy(Infographic $infographic): RedirectResponse
    {
        // Delete associated images
        if ($infographic->image) Storage::disk('public')->delete($infographic->image);
        if ($infographic->banner_image) Storage::disk('public')->delete($infographic->banner_image);

        // Items will be deleted via cascade (foreign key)
        $infographic->delete();

        return back()->with('success', 'Infographic deleted.');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['ids' => 'required|array']);
        foreach ($request->ids as $index => $id) {
            Infographic::whereKey($id)->update(['sort_order' => $index]);
        }
        return back()->with('success', 'Order updated.');
    }
}
