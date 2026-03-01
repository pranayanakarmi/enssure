<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHomeReachItemRequest;
use App\Http\Requests\Admin\UpdateHomeReachItemRequest;
use App\Models\HomeReachItem;
use App\Models\HomeReachSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeReachItemController extends Controller
{
    public function store(StoreHomeReachItemRequest $request): RedirectResponse
    {
        $section = HomeReachSection::first();
        $this->authorize('update', $section);

        $data = $request->validated();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('home-reach-items', 'public');
        } else {
            unset($data['image']);
        }
        $data['home_reach_section_id'] = $section->id;
        $section->items()->create($data);

        return back()->with('success', 'Stat card added.');
    }

    public function edit(HomeReachItem $home_reach_item): Response
    {
        $this->authorize('update', $home_reach_item);

        $home_reach_item->load('homeReachSection');

        return Inertia::render('admin/home_reach_items/edit', [
            'homeReachItem' => [
                'id' => $home_reach_item->id,
                'value' => $home_reach_item->value,
                'suffix' => $home_reach_item->suffix,
                'label' => $home_reach_item->label,
                'image' => $home_reach_item->image,
                'image_url' => $home_reach_item->image ? Storage::disk('public')->url($home_reach_item->image) : null,
                'link_url' => $home_reach_item->link_url,
                'order' => $home_reach_item->order,
            ],
            'section' => [
                'id' => $home_reach_item->homeReachSection->id,
            ],
        ]);
    }

    public function update(UpdateHomeReachItemRequest $request, HomeReachItem $home_reach_item): RedirectResponse
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            if ($home_reach_item->image) {
                Storage::disk('public')->delete($home_reach_item->image);
            }
            $data['image'] = $request->file('image')->store('home-reach-items', 'public');
        } else {
            unset($data['image']);
        }
        $home_reach_item->update($data);

        return redirect()->route('admin.home_reach_sections.edit')
            ->with('success', 'Stat card updated.');
    }

    public function destroy(HomeReachItem $home_reach_item): RedirectResponse
    {
        $this->authorize('delete', $home_reach_item);

        if ($home_reach_item->image) {
            Storage::disk('public')->delete($home_reach_item->image);
        }
        $home_reach_item->delete();

        return back()->with('success', 'Stat card removed.');
    }
}
