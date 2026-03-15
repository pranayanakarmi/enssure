<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeImpactStoriesSectionRequest;
use App\Models\HomeImpactStoriesSection;
use App\Models\ImpactStory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeImpactStoriesSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeImpactStoriesSection::with('impactStories')->first()
            ?? HomeImpactStoriesSection::create([
                'badge_text' => 'Impact Stories',
                'title' => 'Transforming Skills, Changing Lives',
                'description' => 'See how practical apprenticeship training turns potential into progress. Each story highlights a journey of personal growth, showcasing the real-world benefits of a federalized and employer-responsive TVET system.',
                'cta_text' => 'View all stories',
                'cta_url' => '#',
            ]);

        $this->authorize('update', $section);

        $impactStoryIds = $section->impactStories->pluck('id')->values()->all();

        $allImpactStories = ImpactStory::orderBy('title')
            ->get()
            ->map(fn (ImpactStory $s) => [
                'id' => $s->id,
                'title' => $s->title,
                'slug' => $s->slug,
                'image_url' => $s->image ? Storage::disk('public')->url($s->image) : null,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/home_impact_stories_sections/edit', [
            'homeImpactStoriesSection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'description' => $section->description,
                'cta_text' => $section->cta_text,
                'cta_url' => $section->cta_url,
                'impact_story_ids' => $impactStoryIds,
            ],
            'allImpactStories' => $allImpactStories,
        ]);
    }

    public function update(UpdateHomeImpactStoriesSectionRequest $request): RedirectResponse
    {
        $section = HomeImpactStoriesSection::first();

        if (! $section) {
            $section = HomeImpactStoriesSection::create($request->safe()->only([
                'badge_text', 'title', 'description', 'cta_text', 'cta_url',
            ]));
            $this->authorize('update', $section);
        } else {
            $this->authorize('update', $section);
            $section->update($request->safe()->only([
                'badge_text', 'title', 'description', 'cta_text', 'cta_url',
            ]));
        }

        $ids = $request->validated('impact_story_ids', []);
        $sync = collect($ids)->filter()->values()->mapWithKeys(fn ($id, $index) => [$id => ['order' => $index]])->all();
        $section->impactStories()->sync($sync);

        return back()->with('success', 'Home Impact Stories section updated successfully.');
    }
}
