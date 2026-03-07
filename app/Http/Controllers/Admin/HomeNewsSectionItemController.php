<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHomeNewsSectionItemRequest;
use App\Http\Requests\Admin\UpdateHomeNewsSectionItemRequest;
use App\Models\HomeNewsSection;
use App\Models\HomeNewsSectionItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeNewsSectionItemController extends Controller
{
    public function store(StoreHomeNewsSectionItemRequest $request): RedirectResponse
    {
        $section = HomeNewsSection::first();
        $this->authorize('update', $section);

        $data = $request->validated();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('home-news-items', 'public');
        } else {
            unset($data['image']);
        }
        $data['home_news_section_id'] = $section->id;
        $section->items()->create($data);

        return back()->with('success', 'News item added.');
    }

    public function edit(HomeNewsSectionItem $home_news_section_item): Response
    {
        $this->authorize('update', $home_news_section_item);

        $home_news_section_item->load('homeNewsSection');

        return Inertia::render('admin/home_news_section_items/edit', [
            'homeNewsSectionItem' => [
                'id' => $home_news_section_item->id,
                'title' => $home_news_section_item->title,
                'image_url' => $home_news_section_item->image ? Storage::disk('public')->url($home_news_section_item->image) : null,
                'link_url' => $home_news_section_item->link_url,
                'order' => $home_news_section_item->order,
            ],
            'section' => [
                'id' => $home_news_section_item->homeNewsSection->id,
            ],
        ]);
    }

    public function update(UpdateHomeNewsSectionItemRequest $request, HomeNewsSectionItem $home_news_section_item): RedirectResponse
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            if ($home_news_section_item->image) {
                Storage::disk('public')->delete($home_news_section_item->image);
            }
            $data['image'] = $request->file('image')->store('home-news-items', 'public');
        } else {
            unset($data['image']);
        }
        $home_news_section_item->update($data);

        return redirect()->route('admin.home_news_sections.edit')
            ->with('success', 'News item updated.');
    }

    public function destroy(HomeNewsSectionItem $home_news_section_item): RedirectResponse
    {
        $this->authorize('delete', $home_news_section_item);

        if ($home_news_section_item->image) {
            Storage::disk('public')->delete($home_news_section_item->image);
        }
        $home_news_section_item->delete();

        return back()->with('success', 'News item removed.');
    }
}
