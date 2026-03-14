<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateImpactPageSectionRequest;
use App\Models\ImpactPageSection;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ImpactPageSectionController extends Controller
{
    public function edit(): Response
    {
        $section = ImpactPageSection::first()
            ?? ImpactPageSection::create([
                'title' => 'Transforming Skills, Changing Lives',
                'description' => 'See how practical apprenticeship training turns potential into progress. Each story highlights a journey of personal growth, showcasing the real-world benefits of a federalized and employer-responsive TVET system.',
            ]);

        $this->authorize('update', $section);

        return Inertia::render('admin/impact_page/section_edit', [
            'impactPageSection' => [
                'id' => $section->id,
                'title' => $section->title,
                'description' => $section->description,
            ],
        ]);
    }

    public function update(UpdateImpactPageSectionRequest $request): RedirectResponse
    {
        $section = ImpactPageSection::first();

        if (! $section) {
            $section = ImpactPageSection::create($request->validated());
            $this->authorize('update', $section);

            return back()->with('success', 'Impact page section created successfully.');
        }

        $this->authorize('update', $section);

        $section->update($request->validated());

        return back()->with('success', 'Impact page section updated successfully.');
    }
}
