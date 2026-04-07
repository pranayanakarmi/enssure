<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSliderItemRequest;
use App\Http\Requests\Admin\UpdateSliderItemRequest;
use App\Models\Slider;
use App\Models\SliderItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SliderItemController extends Controller
{
    public function store(StoreSliderItemRequest $request, Slider $slider): RedirectResponse
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('slider-items', 'public');
        } else {
            unset($data['image']);
        }
        $slider->items()->create($data);

        return back()->with('success', 'Slider item added.');
    }

    public function edit(SliderItem $slider_item): Response
    {
        $this->authorize('update', $slider_item);

        $slider_item->load('slider');

        return Inertia::render('admin/slider-items/edit', [
            'sliderItem' => [
                'id' => $slider_item->id,
                'slider_id' => $slider_item->slider_id,
                'title' => $slider_item->title,
                'subtitle' => $slider_item->subtitle,
                'description' => $slider_item->description,
                'image' => $slider_item->image,
                'image_url' => $slider_item->image ? Storage::disk('public')->url($slider_item->image) : null,
                'link_url' => $slider_item->link_url,
                'link_text' => $slider_item->link_text,
                'order' => $slider_item->order,
            ],
            'slider' => [
                'id' => $slider_item->slider->id,
                'name' => $slider_item->slider->name,
            ],
        ]);
    }

    public function update(UpdateSliderItemRequest $request, SliderItem $slider_item): RedirectResponse
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            if ($slider_item->image) {
                Storage::disk('public')->delete($slider_item->image);
            }
            $data['image'] = $request->file('image')->store('slider-items', 'public');
        } else {
            unset($data['image']);
        }
        $slider_item->update($data);

        return redirect()->route('admin.sliders.edit', $slider_item->slider_id)
            ->with('success', 'Slider item updated.');
    }

    public function destroy(SliderItem $slider_item): RedirectResponse
    {
        $this->authorize('delete', $slider_item);

        if ($slider_item->image) {
            Storage::disk('public')->delete($slider_item->image);
        }
        $slider_id = $slider_item->slider_id;
        $slider_item->delete();

        return redirect()->route('admin.sliders.edit', $slider_id)
            ->with('success', 'Slider item deleted.');
    }

    public function reorder(Request $request)
{
    $request->validate([
        'items' => 'required|array',
        'items.*.id' => 'required|exists:slider_items,id',
        'items.*.order' => 'required|integer|min:0',
    ]);

    foreach ($request->input('items') as $item) {
        \App\Models\SliderItem::where('id', $item['id'])->update(['order' => $item['order']]);
    }

    return back()->with('success', 'Slides reordered successfully.');
}
}
