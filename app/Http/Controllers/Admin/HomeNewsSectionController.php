<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeNewsSectionRequest;
use App\Models\HomeNewsSection;
use App\Models\Notice;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeNewsSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeNewsSection::with('notices')->first()
            ?? HomeNewsSection::create([
                'badge_text' => 'Updates',
                'title' => 'Latest News and Articles',
                'description' => '',
                'cta_text' => 'View all News',
                'cta_url' => '#',
            ]);

        $this->authorize('update', $section);

        $noticeIds = $section->notices->pluck('id')->values()->all();

        $allNotices = Notice::orderBy('title')
            ->get()
            ->map(fn (Notice $n) => [
                'id' => $n->id,
                'title' => $n->title,
                'slug' => $n->slug,
                'image_url' => $n->image ? Storage::disk('public')->url($n->image) : null,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/home_news_sections/edit', [
            'homeNewsSection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'description' => $section->description,
                'cta_text' => $section->cta_text,
                'cta_url' => $section->cta_url,
                'notice_ids' => $noticeIds,
            ],
            'allNotices' => $allNotices,
        ]);
    }

    public function update(UpdateHomeNewsSectionRequest $request): RedirectResponse
    {
        $section = HomeNewsSection::first();

        if (! $section) {
            $section = HomeNewsSection::create($request->safe()->only([
                'badge_text', 'title', 'description', 'cta_text', 'cta_url',
            ]));
            $this->authorize('update', $section);
        } else {
            $this->authorize('update', $section);
            $section->update($request->safe()->only([
                'badge_text', 'title', 'description', 'cta_text', 'cta_url',
            ]));
        }

        $ids = $request->validated('notice_ids', []);
        $sync = collect($ids)->filter()->values()->mapWithKeys(fn ($id, $index) => [$id => ['order' => $index]])->all();
        $section->notices()->sync($sync);

        return back()->with('success', 'News section updated successfully.');
    }
}
