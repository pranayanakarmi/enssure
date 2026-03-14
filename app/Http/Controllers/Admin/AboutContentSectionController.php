<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateAboutContentSectionRequest;
use App\Models\AboutContentSection;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AboutContentSectionController extends Controller
{
    public function edit(): Response
    {
        $section = AboutContentSection::first()
            ?? AboutContentSection::create([
                'paragraph_1' => "The ENSSURE project is implemented by CTEVT at the federal level; Koshi Province, Madhesh Province, Bagmati Province, Gandaki Province, Lumbini Province, Karnali Province, Sudurpashchim Province and 33 Local Governments within those provinces. Helvetas Nepal provides Technical Assistance to all three tiers of the government and assures the quality of the programme.\n\nENSSURE will contribute to Nepal's ongoing TVET sector federalisation process. It will support the Provincial and Local Governments in the implementation of Dual-VET apprenticeships and training with on-the-job training, to better respond to employers' requirements and workers' aspirations.",
                'paragraph_2' => 'The procurement and implementation of Dual-VET apprenticeships and training with OJT will be done through Province and Local government respectively with technical support from Helvetas Nepal. The project aims to institutionalise these TVET services so that Provincial and Local Governments can deliver on their TVET responsibilities systematically and sustainably beyond the project\'s lifespan.',
            ]);

        $this->authorize('update', $section);

        return Inertia::render('admin/about_page/content_section_edit', [
            'aboutContentSection' => [
                'id' => $section->id,
                'paragraph_1' => $section->paragraph_1,
                'paragraph_2' => $section->paragraph_2,
            ],
        ]);
    }

    public function update(UpdateAboutContentSectionRequest $request): RedirectResponse
    {
        $section = AboutContentSection::first();

        if (! $section) {
            $section = AboutContentSection::create($request->validated());
            $this->authorize('update', $section);

            return back()->with('success', 'About content section created successfully.');
        }

        $this->authorize('update', $section);

        $section->update($request->validated());

        return back()->with('success', 'About content section updated successfully.');
    }
}
