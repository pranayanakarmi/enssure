<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSliderRequest;
use App\Http\Requests\Admin\UpdateSliderRequest;
use App\Models\Slider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SliderController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Slider::class);

        $sliders = Slider::withCount('items')
            ->orderBy('name')
            ->get()
            ->map(fn (Slider $s) => [
                'id' => $s->id,
                'name' => $s->name,
                'location' => $s->location,
                'items_count' => $s->items_count,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/sliders/index', [
            'sliders' => $sliders,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Slider::class);

        return Inertia::render('admin/sliders/create');
    }

    public function store(StoreSliderRequest $request): RedirectResponse
    {
        Slider::create($request->validated());

        return to_route('admin.sliders.index')
            ->with('success', 'Slider created successfully.');
    }

    public function edit(Slider $slider): Response
    {
        $this->authorize('update', $slider);

        $slider->load(['items' => fn ($q) => $q->orderBy('order')]);

        return Inertia::render('admin/sliders/edit', [
            'slider' => [
                'id' => $slider->id,
                'name' => $slider->name,
                'location' => $slider->location,
                'items' => $slider->items->map(fn ($i) => [
                    'id' => $i->id,
                    'title' => $i->title,
                    'subtitle' => $i->subtitle,
                    'description' => $i->description,
                    'image' => $i->image,
                    'image_url' => $i->image ? Storage::disk('public')->url($i->image) : null,
                    'link_url' => $i->link_url,
                    'link_text' => $i->link_text,
                    'order' => $i->order,
                ])->values()->all(),
            ],
        ]);
    }

    public function update(UpdateSliderRequest $request, Slider $slider): RedirectResponse
    {
        $slider->update($request->validated());

        return to_route('admin.sliders.index')
            ->with('success', 'Slider updated successfully.');
    }

    public function destroy(Slider $slider): RedirectResponse
    {
        $this->authorize('delete', $slider);

        $slider->delete();

        return to_route('admin.sliders.index')
            ->with('success', 'Slider deleted successfully.');
    }
}
