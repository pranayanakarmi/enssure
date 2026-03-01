<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeReachSectionRequest;
use App\Models\HomeReachSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeReachSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeReachSection::first()
            ?? HomeReachSection::create([
                'badge_text' => 'Our Reach',
                'title' => 'Our Impact & Milestones',
                'description' => '',
            ]);

        $this->authorize('update', $section);

        $section->load(['items' => fn ($q) => $q->orderBy('order')]);

        $items = $section->items->map(fn ($item) => [
            'id' => $item->id,
            'value' => $item->value,
            'suffix' => $item->suffix,
            'label' => $item->label,
            'image_url' => $item->image ? Storage::disk('public')->url($item->image) : null,
            'link_url' => $item->link_url,
            'order' => $item->order,
        ])->values()->all();

        return Inertia::render('admin/home_reach_sections/edit', [
            'homeReachSection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'description' => $section->description,
                'items' => $items,
            ],
        ]);
    }

    public function update(UpdateHomeReachSectionRequest $request): RedirectResponse
    {
        $section = HomeReachSection::first();

        if (! $section) {
            $section = HomeReachSection::create($request->validated());
            $this->authorize('update', $section);

            return back()->with('success', 'Home Reach section created successfully.');
        }

        $this->authorize('update', $section);

        $section->update($request->validated());

        return back()->with('success', 'Home Reach section updated successfully.');
    }
}
