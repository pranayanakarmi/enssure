<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeAboutSectionRequest;
use App\Models\HomeAboutSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeAboutSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeAboutSection::first()
            ?? HomeAboutSection::create([
                'badge_text' => 'About us',
                'title' => 'Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE)',
                'body' => null,
                'card_title' => 'Skill Upgrading Training for Workers',
                'cta_text' => 'Explore more',
                'cta_url' => '#',
            ]);

        $this->authorize('update', $section);

        return Inertia::render('admin/home_about_sections/edit', [
            'homeAboutSection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'body' => $section->body,
                'card_title' => $section->card_title,
                'content_image_url' => $section->content_image
                    ? Storage::disk('public')->url($section->content_image)
                    : null,
                'background_image_url' => $section->background_image
                    ? Storage::disk('public')->url($section->background_image)
                    : null,
                'cta_text' => $section->cta_text,
                'cta_url' => $section->cta_url,
            ],
        ]);
    }

    public function update(UpdateHomeAboutSectionRequest $request): RedirectResponse
    {
        $section = HomeAboutSection::first();

        if (! $section) {
            $section = HomeAboutSection::create($request->validated());
            $this->authorize('update', $section);

            return back()->with('success', 'Home About section created successfully.');
        }

        $this->authorize('update', $section);

        $data = $request->validated();

        if ($request->hasFile('content_image')) {
            if ($section->content_image) {
                Storage::disk('public')->delete($section->content_image);
            }
            $data['content_image'] = $request->file('content_image')->store('home-about', 'public');
        } else {
            unset($data['content_image']);
        }

        if ($request->hasFile('background_image')) {
            if ($section->background_image) {
                Storage::disk('public')->delete($section->background_image);
            }
            $data['background_image'] = $request->file('background_image')->store('home-about', 'public');
        } else {
            unset($data['background_image']);
        }

        $section->update($data);

        return back()->with('success', 'Home About section updated successfully.');
    }
}
