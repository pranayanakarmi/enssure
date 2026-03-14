<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreImpactStoryRequest;
use App\Http\Requests\Admin\UpdateImpactStoryRequest;
use App\Models\ImpactStory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ImpactStoryController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', ImpactStory::class);

        $stories = ImpactStory::orderByDesc('created_at')
            ->get()
            ->map(fn (ImpactStory $s) => [
                'id' => $s->id,
                'title' => $s->title,
                'slug' => $s->slug,
                'image_url' => $s->image ? Storage::disk('public')->url($s->image) : null,
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
        $data = $request->validated();

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($request->title);
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('impact-stories', 'public');
        } else {
            unset($data['image']);
        }

        ImpactStory::create($data);

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
                'person_title' => $impactStory->person_title,
                'location' => $impactStory->location,
                'story' => $impactStory->story,
                'image' => $impactStory->image,
                'image_url' => $impactStory->image ? Storage::disk('public')->url($impactStory->image) : null,
                'video_url' => $impactStory->video_url,
            ],
        ]);
    }

    public function update(UpdateImpactStoryRequest $request, ImpactStory $impact_story): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($request->title);
        }

        if ($request->boolean('remove_image') && $impact_story->image) {
            Storage::disk('public')->delete($impact_story->image);
            $data['image'] = null;
        } elseif ($request->hasFile('image')) {
            if ($impact_story->image) {
                Storage::disk('public')->delete($impact_story->image);
            }
            $data['image'] = $request->file('image')->store('impact-stories', 'public');
        } else {
            unset($data['image']);
        }
        unset($data['remove_image']);

        $impact_story->update($data);

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
