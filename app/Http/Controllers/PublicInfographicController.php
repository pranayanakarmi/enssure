<?php

namespace App\Http\Controllers;

use App\Models\Infographic;
use Inertia\Inertia;

class PublicInfographicController extends Controller
{
    public function index()
    {
        $infographics = Infographic::where('is_published', true)
            ->orderBy('sort_order')
            ->get(['id', 'title', 'slug', 'description', 'image']);

        return Inertia::render('Infographics', [
            'infographics' => $infographics->map(fn($i) => [
                'id' => $i->id,
                'title' => $i->title,
                'slug' => $i->slug,
                'description' => $i->description,
                'image_url' => $i->thumbnail_url,
                'public_url' => $i->public_url,
            ]),
        ]);
    }

    public function show(Infographic $infographic)
    {
        $infographic->load(['items' => fn($q) => $q->orderBy('sort_order')]);

        return Inertia::render('InfographicShow', [
            'infographic' => [
                'id' => $infographic->id,
                'title' => $infographic->title,
                'hero_title' => $infographic->hero_title ?? $infographic->title,
                'banner_url' => $infographic->banner_url,
                'description' => $infographic->description,
                'url' => $infographic->url,
                'items' => $infographic->items->map(fn($item) => [
                    'id' => $item->id,
                    'title' => $item->title,
                    'image_url' => $item->image_url,
                    'alt_text' => $item->alt_text,

                ]),
            ],
        ]);
    }
}
