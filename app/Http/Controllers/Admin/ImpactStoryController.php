<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreImpactStoryRequest;
use App\Http\Requests\Admin\UpdateImpactStoryRequest;
use App\Models\ImpactStory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ImpactStoryController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', ImpactStory::class);

        $stories = ImpactStory::orderBy('order')
            ->orderByDesc('published_at')
            ->get()
            ->map(fn (ImpactStory $s) => [
                'id' => $s->id,
                'title' => $s->title,
                'slug' => $s->slug,
                'person_name' => $s->person_name,
                'published_at' => $s->published_at?->toISOString(),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/impact-stories/index', [
            'impactStories' => $stories,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', ImpactStory::class);

        return Inertia::render('admin/impact-stories/create');
    }

    public function store(StoreImpactStoryRequest $request): RedirectResponse
    {
        ImpactStory::create($request->validated());

        return to_route('admin.impact_stories.index')
            ->with('success', 'Impact story created successfully.');
    }

    public function edit(ImpactStory $impact_story): Response
    {
        $this->authorize('update', $impact_story);

        $impactStory = $impact_story;

        return Inertia::render('admin/impact-stories/edit', [
            'impactStory' => [
                'id' => $impactStory->id,
                'title' => $impactStory->title,
                'slug' => $impactStory->slug,
                'person_name' => $impactStory->person_name,
                'person_title' => $impactStory->person_title,
                'location' => $impactStory->location,
                'story' => $impactStory->story,
                'image' => $impactStory->image,
                'video_url' => $impactStory->video_url,
                'published_at' => $impactStory->published_at?->toISOString(),
                'order' => $impactStory->order,
            ],
        ]);
    }

    public function update(UpdateImpactStoryRequest $request, ImpactStory $impact_story): RedirectResponse
    {
        $impact_story->update($request->validated());

        return to_route('admin.impact_stories.index')
            ->with('success', 'Impact story updated successfully.');
    }

    public function destroy(ImpactStory $impact_story): RedirectResponse
    {
        $this->authorize('delete', $impact_story);

        $impact_story->delete();

        return to_route('admin.impact_stories.index')
            ->with('success', 'Impact story deleted successfully.');
    }
}
