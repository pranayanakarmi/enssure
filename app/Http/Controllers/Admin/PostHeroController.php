<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdatePostHeroRequest;
use App\Models\PostHero;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostHeroController extends Controller
{
    public function edit(): Response
    {
        $hero = PostHero::first() ?? PostHero::create([
            'hero_image' => null,
        ]);

        $this->authorize('update', $hero);

        return Inertia::render('admin/posts/hero_edit', [
            'postHero' => [
                'id' => $hero->id,
                'hero_image_url' => $hero->hero_image
                    ? Storage::disk('public')->url($hero->hero_image)
                    : null,
            ],
        ]);
    }

    public function update(UpdatePostHeroRequest $request): RedirectResponse
    {
        $hero = PostHero::first();

        if (! $hero) {
            $hero = PostHero::create($request->validated());
            $this->authorize('update', $hero);

            return back()->with('success', 'Post hero background created successfully.');
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

            $data['hero_image'] = $request->file('hero_image')->store('posts', 'public');
        } else {
            unset($data['hero_image']);
        }

        unset($data['remove_hero_image']);
        $hero->update($data);

        return back()->with('success', 'Post hero background updated successfully.');
    }
}
