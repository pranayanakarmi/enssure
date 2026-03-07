<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomePartnersSectionRequest;
use App\Models\HomePartnersSection;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HomePartnersSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomePartnersSection::first()
            ?? HomePartnersSection::create([
                'badge_text' => 'Our Partners',
                'title' => 'We work with the best Partners',
            ]);

        $this->authorize('update', $section);

        return Inertia::render('admin/home_partners_sections/edit', [
            'homePartnersSection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
            ],
        ]);
    }

    public function update(UpdateHomePartnersSectionRequest $request): RedirectResponse
    {
        $section = HomePartnersSection::first();

        if (! $section) {
            $section = HomePartnersSection::create(
                $request->safe()->only(['badge_text', 'title'])
            );
            $this->authorize('update', $section);

            return back()->with('success', 'Partners section created successfully.');
        }

        $this->authorize('update', $section);

        $section->update($request->safe()->only(['badge_text', 'title']));

        return back()->with('success', 'Partners section updated successfully.');
    }
}
