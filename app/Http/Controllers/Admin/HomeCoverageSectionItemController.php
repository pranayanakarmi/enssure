<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHomeCoverageSectionItemRequest;
use App\Http\Requests\Admin\UpdateHomeCoverageSectionItemRequest;
use App\Models\HomeCoverageSection;
use App\Models\HomeCoverageSectionItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeCoverageSectionItemController extends Controller
{
    public function store(StoreHomeCoverageSectionItemRequest $request): RedirectResponse
    {
        $section = HomeCoverageSection::first();
        $this->authorize('update', $section);

        $data = $request->validated();
        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('home-coverage-items', 'public');
        } else {
            unset($data['icon']);
        }
        $data['home_coverage_section_id'] = $section->id;
        $section->items()->create($data);

        return back()->with('success', 'Coverage stat added.');
    }

    public function edit(HomeCoverageSectionItem $home_coverage_section_item): Response
    {
        $this->authorize('update', $home_coverage_section_item);

        $home_coverage_section_item->load('homeCoverageSection');

        return Inertia::render('admin/home_coverage_section_items/edit', [
            'homeCoverageSectionItem' => [
                'id' => $home_coverage_section_item->id,
                'value' => $home_coverage_section_item->value,
                'label' => $home_coverage_section_item->label,
                'icon_url' => $home_coverage_section_item->icon ? Storage::disk('public')->url($home_coverage_section_item->icon) : null,
                'order' => $home_coverage_section_item->order,
            ],
            'section' => [
                'id' => $home_coverage_section_item->homeCoverageSection->id,
            ],
        ]);
    }

    public function update(UpdateHomeCoverageSectionItemRequest $request, HomeCoverageSectionItem $home_coverage_section_item): RedirectResponse
    {
        $data = $request->validated();
        if ($request->hasFile('icon')) {
            if ($home_coverage_section_item->icon) {
                Storage::disk('public')->delete($home_coverage_section_item->icon);
            }
            $data['icon'] = $request->file('icon')->store('home-coverage-items', 'public');
        } else {
            unset($data['icon']);
        }
        $home_coverage_section_item->update($data);

        return redirect()->route('admin.home_coverage_sections.edit')
            ->with('success', 'Coverage stat updated.');
    }

    public function destroy(HomeCoverageSectionItem $home_coverage_section_item): RedirectResponse
    {
        $this->authorize('delete', $home_coverage_section_item);

        if ($home_coverage_section_item->icon) {
            Storage::disk('public')->delete($home_coverage_section_item->icon);
        }
        $home_coverage_section_item->delete();

        return back()->with('success', 'Coverage stat removed.');
    }
}
