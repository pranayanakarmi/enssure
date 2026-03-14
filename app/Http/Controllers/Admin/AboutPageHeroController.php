<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateAboutPageHeroRequest;
use App\Models\AboutPageHero;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AboutPageHeroController extends Controller
{
    public function edit(): Response
    {
        $hero = AboutPageHero::first()
            ?? AboutPageHero::create([
                'title' => 'About Us',
                'hero_image' => null,
            ]);

        $this->authorize('update', $hero);

        return Inertia::render('admin/about_page/hero_edit', [
            'aboutPageHero' => [
                'id' => $hero->id,
                'title' => $hero->title,
                'hero_image_url' => $hero->hero_image
                    ? Storage::disk('public')->url($hero->hero_image)
                    : null,
            ],
        ]);
    }

    public function update(UpdateAboutPageHeroRequest $request): RedirectResponse
    {
        $hero = AboutPageHero::first();

        if (! $hero) {
            $hero = AboutPageHero::create($request->validated());
            $this->authorize('update', $hero);

            return back()->with('success', 'About page hero created successfully.');
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
            $data['hero_image'] = $request->file('hero_image')->store('about-page', 'public');
        } else {
            unset($data['hero_image']);
        }

        unset($data['remove_hero_image']);
        $hero->update($data);

        return back()->with('success', 'About page hero updated successfully.');
    }
}
