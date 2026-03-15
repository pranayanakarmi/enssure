<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateTeamPageContentRequest;
use App\Models\TeamPageContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TeamPageContentController extends Controller
{
    public function edit(): Response
    {
        $content = TeamPageContent::first()
            ?? TeamPageContent::create([
                'title' => 'Our Team',
                'description' => null,
                'banner_image' => null,
            ]);

        $this->authorize('update', $content);

        return Inertia::render('admin/team_page/content_edit', [
            'teamPageContent' => [
                'id' => $content->id,
                'title' => $content->title,
                'description' => $content->description,
                'banner_image_url' => $content->banner_image
                    ? Storage::disk('public')->url($content->banner_image)
                    : null,
            ],
        ]);
    }

    public function update(UpdateTeamPageContentRequest $request): RedirectResponse
    {
        $content = TeamPageContent::first();

        if (! $content) {
            $content = TeamPageContent::create($request->validated());
            $this->authorize('update', $content);

            return back()->with('success', 'Team page content created successfully.');
        }

        $this->authorize('update', $content);

        $data = $request->validated();

        if ($request->boolean('remove_banner_image') && $content->banner_image) {
            Storage::disk('public')->delete($content->banner_image);
            $data['banner_image'] = null;
        } elseif ($request->hasFile('banner_image')) {
            if ($content->banner_image) {
                Storage::disk('public')->delete($content->banner_image);
            }
            $data['banner_image'] = $request->file('banner_image')->store('team-page', 'public');
        } else {
            unset($data['banner_image']);
        }

        unset($data['remove_banner_image']);
        $content->update($data);

        return back()->with('success', 'Team page content updated successfully.');
    }
}
