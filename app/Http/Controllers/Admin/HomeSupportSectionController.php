<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeSupportSectionRequest;
use App\Models\HomeSupportSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeSupportSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeSupportSection::first()
            ?? HomeSupportSection::create([
                'badge_text' => 'Support',
                'title' => 'Technical Assistance By',
            ]);

        $this->authorize('update', $section);

        return Inertia::render('admin/home_support_sections/edit', [
            'homeSupportSection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'image_url' => $section->image ? Storage::disk('public')->url($section->image) : null,
            ],
        ]);
    }

    public function update(UpdateHomeSupportSectionRequest $request): RedirectResponse
    {
        $section = HomeSupportSection::first();

        if (! $section) {
            $section = HomeSupportSection::create(
                $request->safe()->only(['badge_text', 'title'])
            );
            $this->authorize('update', $section);
            if ($request->hasFile('image')) {
                $section->update([
                    'image' => $request->file('image')->store('home-support', 'public'),
                ]);
            }

            return back()->with('success', 'Support section created successfully.');
        }

        $this->authorize('update', $section);

        $data = $request->safe()->only(['badge_text', 'title']);
        if ($request->hasFile('image')) {
            if ($section->image) {
                Storage::disk('public')->delete($section->image);
            }
            $data['image'] = $request->file('image')->store('home-support', 'public');
        }
        $section->update($data);

        return back()->with('success', 'Support section updated successfully.');
    }
}
