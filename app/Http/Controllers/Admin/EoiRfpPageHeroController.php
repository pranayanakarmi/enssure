<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EoiRfpPageHero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EoiRfpPageHeroController extends Controller
{
    /**
     * Show the hero edit form.
     */
    public function edit()
    {
        $hero = EoiRfpPageHero::first();
        return Inertia::render('admin/eoi-rfp/hero', [
            'hero' => $hero,
        ]);
    }

    /**
     * Update the hero settings.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'remove_hero_image' => 'nullable|boolean',
        ]);

        $hero = EoiRfpPageHero::firstOrNew();

        // Upload new image
        if ($request->hasFile('hero_image')) {
            // Delete old image if exists
            if ($hero->hero_image) {
                Storage::disk('public')->delete($hero->hero_image);
            }
            $path = $request->file('hero_image')->store('eoi-rfp-heroes', 'public');
            $hero->hero_image = $path;
        }

        // Remove image if requested
        if ($request->boolean('remove_hero_image')) {
            if ($hero->hero_image) {
                Storage::disk('public')->delete($hero->hero_image);
            }
            $hero->hero_image = null;
        }

        // Update text fields
        $hero->title = $data['title'];
        $hero->description = $data['description'];
        $hero->save();

        return back()->with('success', 'Hero updated successfully.');
    }
}
