<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeImpactStoriesSectionRequest;
use App\Models\HomeImpactStoriesSection;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HomeImpactStoriesSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeImpactStoriesSection::first()
            ?? HomeImpactStoriesSection::create([
                'badge_text' => 'Impact Stories',
                'title' => 'Transforming Skills, Changing Lives',
                'description' => 'See how practical apprenticeship training turns potential into progress. Each story highlights a journey of personal growth, showcasing the real-world benefits of a federalized and employer-responsive TVET system.',
                'cta_text' => 'View all stories',
                'cta_url' => '#',
            ]);

        $this->authorize('update', $section);

        return Inertia::render('admin/home_impact_stories_sections/edit', [
            'homeImpactStoriesSection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'description' => $section->description,
                'cta_text' => $section->cta_text,
                'cta_url' => $section->cta_url,
            ],
        ]);
    }

    public function update(UpdateHomeImpactStoriesSectionRequest $request): RedirectResponse
    {
        $section = HomeImpactStoriesSection::first();

        if (! $section) {
            $section = HomeImpactStoriesSection::create($request->validated());
            $this->authorize('update', $section);

            return back()->with('success', 'Home Impact Stories section created successfully.');
        }

        $this->authorize('update', $section);

        $section->update($request->validated());

        return back()->with('success', 'Home Impact Stories section updated successfully.');
    }
}
