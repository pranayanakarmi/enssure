<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateAboutMainSectionRequest;
use App\Models\AboutMainSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AboutMainSectionController extends Controller
{
    public function edit(): Response
    {
        $section = AboutMainSection::first()
            ?? AboutMainSection::create([
                'title' => 'Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE)',
                'body' => null,
                'card_title' => 'Skill Upgrading Training for Workers',
                'cta_text' => 'Explore more',
                'cta_url' => '#',
            ]);

        $this->authorize('update', $section);

        return Inertia::render('admin/about_page/main_section_edit', [
            'aboutMainSection' => [
                'id' => $section->id,
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

    public function update(UpdateAboutMainSectionRequest $request): RedirectResponse
    {
        $section = AboutMainSection::first();

        if (! $section) {
            $section = AboutMainSection::create($request->validated());
            $this->authorize('update', $section);

            return back()->with('success', 'About main section created successfully.');
        }

        $this->authorize('update', $section);

        $data = $request->validated();

        if ($request->hasFile('content_image')) {
            if ($section->content_image) {
                Storage::disk('public')->delete($section->content_image);
            }
            $data['content_image'] = $request->file('content_image')->store('about-page', 'public');
        } else {
            unset($data['content_image']);
        }

        if ($request->hasFile('background_image')) {
            if ($section->background_image) {
                Storage::disk('public')->delete($section->background_image);
            }
            $data['background_image'] = $request->file('background_image')->store('about-page', 'public');
        } else {
            unset($data['background_image']);
        }

        $section->update($data);

        return back()->with('success', 'About main section updated successfully.');
    }
}
