<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateImpactPageHeroRequest;
use App\Models\ImpactPageHero;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ImpactPageHeroController extends Controller
{
    public function edit(): Response
    {
        $hero = ImpactPageHero::first()
            ?? ImpactPageHero::create([
                'title' => 'Impact Stories',
                'hero_image' => null,
            ]);

        $this->authorize('update', $hero);

        return Inertia::render('admin/impact_page/hero_edit', [
            'impactPageHero' => [
                'id' => $hero->id,
                'title' => $hero->title,
                'hero_image_url' => $hero->hero_image
                    ? Storage::disk('public')->url($hero->hero_image)
                    : null,
            ],
        ]);
    }

    public function update(UpdateImpactPageHeroRequest $request): RedirectResponse
    {
        $hero = ImpactPageHero::first();

        if (! $hero) {
            $hero = ImpactPageHero::create($request->validated());
            $this->authorize('update', $hero);

            return back()->with('success', 'Impact page hero created successfully.');
        }

        $this->authorize('update', $hero);

        $data = $request->validated();

        if ($request->boolean('remove_hero_image') && $hero->hero_image) {
            Storage::disk('public')->delete($hero->hero_image);
            $data['hero_image'] = null;
        } elseif ($request->hasFile('hero_image')) {
            if ($hero->hero_image) {
                Storage::disk('public')->delete($hero->hero_image);
            }
            $data['hero_image'] = $request->file('hero_image')->store('impact-page', 'public');
        } else {
            unset($data['hero_image']);
        }

        unset($data['remove_hero_image']);
        $hero->update($data);

        return back()->with('success', 'Impact page hero updated successfully.');
    }
}
