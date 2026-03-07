<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeTestimonialsSectionRequest;
use App\Models\HomeTestimonialsSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeTestimonialsSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeTestimonialsSection::first()
            ?? HomeTestimonialsSection::create([
                'badge_text' => 'Testimonials',
                'title' => 'Direct testimonials that showcase the real, on-the-ground impact of the ENSSURE project on people and the skills sector in Nepal...',
            ]);

        $this->authorize('update', $section);

        return Inertia::render('admin/home_testimonials_sections/edit', [
            'homeTestimonialsSection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'background_image_url' => $section->background_image
                    ? Storage::disk('public')->url($section->background_image)
                    : null,
            ],
        ]);
    }

    public function update(UpdateHomeTestimonialsSectionRequest $request): RedirectResponse
    {
        $section = HomeTestimonialsSection::first();

        if (! $section) {
            $section = HomeTestimonialsSection::create(
                $request->safe()->only(['badge_text', 'title'])
            );
            $this->authorize('update', $section);
            if ($request->hasFile('background_image')) {
                $section->update([
                    'background_image' => $request->file('background_image')->store('home-testimonials', 'public'),
                ]);
            }

            return back()->with('success', 'Testimonials section created successfully.');
        }

        $this->authorize('update', $section);

        $data = $request->safe()->only(['badge_text', 'title']);
        if ($request->hasFile('background_image')) {
            if ($section->background_image) {
                Storage::disk('public')->delete($section->background_image);
            }
            $data['background_image'] = $request->file('background_image')->store('home-testimonials', 'public');
        }
        $section->update($data);

        return back()->with('success', 'Testimonials section updated successfully.');
    }
}
