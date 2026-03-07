<?php

use App\Models\HomeAboutSection;
use App\Models\HomeContactCtaSection;
use App\Models\HomeCoverageSection;
use App\Models\HomeGallerySection;
use App\Models\HomeImpactStoriesSection;
use App\Models\HomeNewsSection;
use App\Models\HomePartnersSection;
use App\Models\HomeReachSection;
use App\Models\HomeSupportSection;
use App\Models\HomeTestimonialsSection;
use App\Models\Partner;
use App\Models\Slider;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $homeReachSection = HomeReachSection::with(['items' => fn ($q) => $q->orderBy('order')])->first();
    $homeAboutSection = HomeAboutSection::first();
    $homeGallerySection = HomeGallerySection::with(['items' => fn ($q) => $q->orderBy('order')])->first();
    $homeImpactStoriesSection = HomeImpactStoriesSection::first();
    $homeCoverageSection = HomeCoverageSection::with(['items' => fn ($q) => $q->orderBy('order')])->first();
    $homeNewsSection = HomeNewsSection::with(['items' => fn ($q) => $q->orderBy('order')])->first();
    $homeTestimonialsSection = HomeTestimonialsSection::first();
    $homePartnersSection = HomePartnersSection::first();
    $homeSupportSection = HomeSupportSection::first();
    $homeContactCtaSection = HomeContactCtaSection::first();
    $partners = Partner::orderBy('order')
        ->get()
        ->map(fn ($p) => [
            'logo_url' => $p->logo
                ? (str_starts_with($p->logo, 'http') ? $p->logo : Storage::disk('public')->url($p->logo))
                : null,
            'name' => $p->name,
        ])
        ->values()
        ->all();
    $testimonials = Testimonial::where('is_published', true)
        ->orderBy('order')
        ->get()
        ->map(fn ($t) => [
            'quote' => $t->testimonial_text,
            'name' => $t->name,
            'role' => $t->designation ?? $t->organization ?? '',
            'image_url' => $t->image ? Storage::disk('public')->url($t->image) : null,
        ])
        ->values()
        ->all();

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
        'homeAboutSection' => $homeAboutSection ? [
            'badge_text' => $homeAboutSection->badge_text,
            'title' => $homeAboutSection->title,
            'body' => $homeAboutSection->body
                ? strip_tags($homeAboutSection->body, '<p><br><strong><em><u><a><ul><ol><li><h2><h3>')
                : null,
            'card_title' => $homeAboutSection->card_title,
            'content_image_url' => $homeAboutSection->content_image
                ? Storage::disk('public')->url($homeAboutSection->content_image)
                : null,
            'background_image_url' => $homeAboutSection->background_image
                ? Storage::disk('public')->url($homeAboutSection->background_image)
                : null,
            'cta_text' => $homeAboutSection->cta_text,
            'cta_url' => $homeAboutSection->cta_url,
        ] : null,
        'homeGallerySection' => $homeGallerySection ? [
            'badge_text' => $homeGallerySection->badge_text,
            'title' => $homeGallerySection->title,
            'description' => $homeGallerySection->description,
            'cta_text' => $homeGallerySection->cta_text,
            'cta_url' => $homeGallerySection->cta_url,
            'items' => $homeGallerySection->items->map(fn ($item) => [
                'id' => $item->id,
                'image_url' => $item->image ? Storage::disk('public')->url($item->image) : null,
                'text' => $item->text,
                'order' => $item->order,
            ])->values()->all(),
        ] : null,
        'homeImpactStoriesSection' => $homeImpactStoriesSection ? [
            'badge_text' => $homeImpactStoriesSection->badge_text,
            'title' => $homeImpactStoriesSection->title,
            'description' => $homeImpactStoriesSection->description,
            'cta_text' => $homeImpactStoriesSection->cta_text,
            'cta_url' => $homeImpactStoriesSection->cta_url,
        ] : null,
        'homeCoverageSection' => $homeCoverageSection ? [
            'badge_text' => $homeCoverageSection->badge_text,
            'title' => $homeCoverageSection->title,
            'description' => $homeCoverageSection->description
                ? strip_tags($homeCoverageSection->description, '<p><br><strong><em><u><a><ul><ol><li><h2><h3>')
                : null,
            'map_image_url' => $homeCoverageSection->map_image
                ? Storage::disk('public')->url($homeCoverageSection->map_image)
                : null,
            'items' => $homeCoverageSection->items->map(fn ($item) => [
                'value' => $item->value,
                'label' => $item->label,
                'icon_url' => $item->icon ? Storage::disk('public')->url($item->icon) : null,
                'order' => $item->order,
            ])->values()->all(),
        ] : null,
        'homeNewsSection' => $homeNewsSection ? [
            'badge_text' => $homeNewsSection->badge_text,
            'title' => $homeNewsSection->title,
            'description' => $homeNewsSection->description,
            'cta_text' => $homeNewsSection->cta_text,
            'cta_url' => $homeNewsSection->cta_url,
            'items' => $homeNewsSection->items->map(fn ($item) => [
                'title' => $item->title,
                'image_url' => $item->image ? Storage::disk('public')->url($item->image) : null,
                'link_url' => $item->link_url,
                'order' => $item->order,
            ])->values()->all(),
        ] : null,
        'homeTestimonialsSection' => $homeTestimonialsSection ? [
            'badge_text' => $homeTestimonialsSection->badge_text,
            'title' => $homeTestimonialsSection->title
                ? strip_tags($homeTestimonialsSection->title, '<span><br><strong><em>')
                : null,
            'background_image_url' => $homeTestimonialsSection->background_image
                ? Storage::disk('public')->url($homeTestimonialsSection->background_image)
                : null,
        ] : null,
        'homePartnersSection' => $homePartnersSection ? [
            'badge_text' => $homePartnersSection->badge_text,
            'title' => $homePartnersSection->title,
        ] : null,
        'homeSupportSection' => $homeSupportSection ? [
            'badge_text' => $homeSupportSection->badge_text,
            'title' => $homeSupportSection->title,
            'image_url' => $homeSupportSection->image
                ? Storage::disk('public')->url($homeSupportSection->image)
                : null,
        ] : null,
        'homeContactCtaSection' => $homeContactCtaSection ? [
            'badge_text' => $homeContactCtaSection->badge_text,
            'title' => $homeContactCtaSection->title,
            'highlight_phrase' => $homeContactCtaSection->highlight_phrase,
            'button_text' => $homeContactCtaSection->button_text,
            'background_image_url' => $homeContactCtaSection->background_image
                ? Storage::disk('public')->url($homeContactCtaSection->background_image)
                : null,
        ] : null,
        'partners' => $partners,
        'testimonials' => $testimonials,
    ]);
})->name('home');

Route::get('about', fn () => Inertia::render('About'))->name('about');
Route::get('notices', fn () => Inertia::render('Archive'))->name('notices.index');
Route::get('notices/single-archive', fn () => Inertia::render('SingleArchive'))->name('notices.single');
Route::get('contact', fn () => Inertia::render('Contact'))->name('contact');
Route::get('gallery', fn () => Inertia::render('Gallery'))->name('gallery');
Route::get('impact-stories', fn () => Inertia::render('ImpactStories'))->name('impact-stories');
Route::get('team', fn () => Inertia::render('Team'))->name('team');
Route::get('vacancy', fn () => Inertia::render('Vacancy'))->name('vacancy');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
