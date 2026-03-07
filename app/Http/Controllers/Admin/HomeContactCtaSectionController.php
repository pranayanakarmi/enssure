<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeContactCtaSectionRequest;
use App\Models\HomeContactCtaSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeContactCtaSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeContactCtaSection::first()
            ?? HomeContactCtaSection::create([
                'badge_text' => 'JOIN US',
                'title' => 'Build Skills, Build Futures. Support sustainable employment today.',
                'highlight_phrase' => 'Support sustainable',
                'button_text' => 'Contact us',
            ]);

        $this->authorize('update', $section);

        return Inertia::render('admin/home_contact_cta_sections/edit', [
            'homeContactCtaSection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'highlight_phrase' => $section->highlight_phrase,
                'button_text' => $section->button_text,
                'background_image_url' => $section->background_image
                    ? Storage::disk('public')->url($section->background_image)
                    : null,
            ],
        ]);
    }

    public function update(UpdateHomeContactCtaSectionRequest $request): RedirectResponse
    {
        $section = HomeContactCtaSection::first();

        if (! $section) {
            $section = HomeContactCtaSection::create(
                $request->safe()->only(['badge_text', 'title', 'highlight_phrase', 'button_text'])
            );
            $this->authorize('update', $section);
            if ($request->hasFile('background_image')) {
                $section->update([
                    'background_image' => $request->file('background_image')->store('home-contact-cta', 'public'),
                ]);
            }

            return back()->with('success', 'Contact CTA section created successfully.');
        }

        $this->authorize('update', $section);

        $data = $request->safe()->only(['badge_text', 'title', 'highlight_phrase', 'button_text']);
        if ($request->hasFile('background_image')) {
            if ($section->background_image) {
                Storage::disk('public')->delete($section->background_image);
            }
            $data['background_image'] = $request->file('background_image')->store('home-contact-cta', 'public');
        }
        $section->update($data);

        return back()->with('success', 'Contact CTA section updated successfully.');
    }
}
