<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateHomeCoverageSectionRequest;
use App\Models\HomeCoverageSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeCoverageSectionController extends Controller
{
    public function edit(): Response
    {
        $section = HomeCoverageSection::first()
            ?? HomeCoverageSection::create([
                'badge_text' => 'Coverage',
                'title' => 'Reaching Across the Nation',
                'description' => '',
            ]);

        $this->authorize('update', $section);

        $section->load(['items' => fn ($q) => $q->orderBy('order')]);

        $items = $section->items->map(fn ($item) => [
            'id' => $item->id,
            'value' => $item->value,
            'label' => $item->label,
            'icon_url' => $item->icon ? Storage::disk('public')->url($item->icon) : null,
            'order' => $item->order,
        ])->values()->all();

        return Inertia::render('admin/home_coverage_sections/edit', [
            'homeCoverageSection' => [
                'id' => $section->id,
                'badge_text' => $section->badge_text,
                'title' => $section->title,
                'description' => $section->description,
                'map_image_url' => $section->map_image ? Storage::disk('public')->url($section->map_image) : null,
                'items' => $items,
            ],
        ]);
    }

    public function update(UpdateHomeCoverageSectionRequest $request): RedirectResponse
    {
        $section = HomeCoverageSection::first();

        if (! $section) {
            $section = HomeCoverageSection::create($request->safe()->only(['badge_text', 'title', 'description']));
            $this->authorize('update', $section);
            if ($request->hasFile('map_image')) {
                $section->update(['map_image' => $request->file('map_image')->store('home-coverage', 'public')]);
            }

            return back()->with('success', 'Coverage section created successfully.');
        }

        $this->authorize('update', $section);

        $data = $request->safe()->only(['badge_text', 'title', 'description']);
        if ($request->hasFile('map_image')) {
            if ($section->map_image) {
                Storage::disk('public')->delete($section->map_image);
            }
            $data['map_image'] = $request->file('map_image')->store('home-coverage', 'public');
        }
        $section->update($data);

        return back()->with('success', 'Coverage section updated successfully.');
    }
}
