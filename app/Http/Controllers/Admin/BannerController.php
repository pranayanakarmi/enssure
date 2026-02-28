<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBannerRequest;
use App\Http\Requests\Admin\UpdateBannerRequest;
use App\Models\Banner;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BannerController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Banner::class);

        $banners = Banner::orderBy('order')
            ->get()
            ->map(fn (Banner $b) => [
                'id' => $b->id,
                'title' => $b->title,
                'subtitle' => $b->subtitle,
                'image_path' => $b->image_path,
                'order' => $b->order,
                'is_active' => $b->is_active,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/banners/index', [
            'banners' => $banners,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Banner::class);

        return Inertia::render('admin/banners/create');
    }

    public function store(StoreBannerRequest $request): RedirectResponse
    {
        Banner::create($request->validated());

        return to_route('admin.banners.index')
            ->with('success', 'Banner created successfully.');
    }

    public function edit(Banner $banner): Response
    {
        $this->authorize('update', $banner);

        return Inertia::render('admin/banners/edit', [
            'banner' => [
                'id' => $banner->id,
                'title' => $banner->title,
                'subtitle' => $banner->subtitle,
                'description' => $banner->description,
                'image_path' => $banner->image_path,
                'button_text' => $banner->button_text,
                'button_url' => $banner->button_url,
                'order' => $banner->order,
                'is_active' => $banner->is_active,
            ],
        ]);
    }

    public function update(UpdateBannerRequest $request, Banner $banner): RedirectResponse
    {
        $banner->update($request->validated());

        return to_route('admin.banners.index')
            ->with('success', 'Banner updated successfully.');
    }

    public function destroy(Banner $banner): RedirectResponse
    {
        $this->authorize('delete', $banner);

        $banner->delete();

        return to_route('admin.banners.index')
            ->with('success', 'Banner deleted successfully.');
    }
}
