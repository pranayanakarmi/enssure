<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeNewsSectionRequest;
use App\Models\HomeNewsSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeNewsSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeNewsSection::first()
            ?? HomeNewsSection::create([
                'badge_text' => 'Updates',
                'title' => 'Latest News and Articles',
                'description' => '',
                'cta_text' => 'View all News',
                'cta_url' => '#',
            ]);

        $this->authorize('update', $section);

        $section->load(['items' => fn ($q) => $q->orderBy('order')]);

        $items = $section->items->map(fn ($item) => [
            'id' => $item->id,
            'title' => $item->title,
            'image_url' => $item->image ? Storage::disk('public')->url($item->image) : null,
            'link_url' => $item->link_url,
            'order' => $item->order,
        ])->values()->all();

        return Inertia::render('admin/home_news_sections/edit', [
            'homeNewsSection' => [
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

    public function update(UpdateHomeNewsSectionRequest $request): RedirectResponse
    {
        $section = HomeNewsSection::first();

        if (! $section) {
            $section = HomeNewsSection::create($request->validated());
            $this->authorize('update', $section);

            return back()->with('success', 'News section created successfully.');
        }

        $this->authorize('update', $section);

        $section->update($request->validated());

        return back()->with('success', 'News section updated successfully.');
    }
}
