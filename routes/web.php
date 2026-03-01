<?php

use App\Models\HomeReachSection;
use App\Models\Slider;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $homeReachSection = HomeReachSection::with(['items' => fn ($q) => $q->orderBy('order')])->first();

    $heroSlider = Slider::where('location', '/')
        ->with(['items' => fn ($q) => $q->orderBy('order')])
        ->first();

    $heroSlides = $heroSlider
        ? $heroSlider->items->map(fn ($i) => [
            'id' => $i->id,
            'title' => $i->title,
            'subtitle' => $i->subtitle,
            'description' => $i->description,
            'image_url' => $i->image ? Storage::disk('public')->url($i->image) : null,
            'link_url' => $i->link_url,
            'link_text' => $i->link_text,
            'order' => $i->order,
        ])->values()->all()
        : [];

    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'heroSlides' => $heroSlides,
        'homeReachSection' => $homeReachSection ? [
            'badge_text' => $homeReachSection->badge_text,
            'title' => $homeReachSection->title,
            'description' => strip_tags(
                $homeReachSection->description,
                '<p><br><strong><em><u><a><ul><ol><li><h2><h3>'
            ),
            'items' => $homeReachSection->items->map(fn ($item) => [
                'value' => $item->value,
                'suffix' => $item->suffix,
                'label' => $item->label,
                'image_url' => $item->image ? Storage::disk('public')->url($item->image) : null,
                'link_url' => $item->link_url,
                'order' => $item->order,
            ])->values()->all(),
        ] : null,
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
