<?php

use App\Models\Page;
use App\Models\PageHero;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('pages show returns published page detail', function () {
    $page = Page::create([
        'title' => 'About us',
        'slug' => 'about-us',
        'meta_title' => 'About — ENSSURE',
        'meta_description' => 'Learn about our work.',
        'content' => '<p>Welcome</p>',
        'published_at' => now()->subHour(),
    ]);

    $response = $this->get(route('pages.show', ['published_page' => $page->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $inertia) => $inertia
        ->component('PageShow')
        ->has('page')
        ->where('page.title', 'About us')
        ->where('page.slug', 'about-us')
        ->where('page.meta_title', 'About — ENSSURE')
        ->where('page.meta_description', 'Learn about our work.')
        ->has('page.content')
        ->where('pageHero.hero_image_url', null)
    );
});

test('pages show returns configured shared hero background image', function () {
    $page = Page::create([
        'title' => 'Training with OJT',
        'slug' => 'training-with-ojt',
        'published_at' => now()->subHour(),
    ]);

    PageHero::create([
        'hero_image' => 'pages/training-hero.jpg',
    ]);

    $response = $this->get(route('pages.show', ['published_page' => $page->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $inertia) => $inertia
        ->component('PageShow')
        ->where('pageHero.hero_image_url', Storage::disk('public')->url('pages/training-hero.jpg'))
    );
});

test('pages show returns 404 for draft page', function () {
    Page::create([
        'title' => 'Draft',
        'slug' => 'draft-only',
        'published_at' => null,
    ]);

    $this->get(route('pages.show', ['published_page' => 'draft-only']))
        ->assertNotFound();
});

test('pages show returns 404 for future scheduled page', function () {
    Page::create([
        'title' => 'Scheduled',
        'slug' => 'scheduled-page',
        'published_at' => now()->addWeek(),
    ]);

    $this->get(route('pages.show', ['published_page' => 'scheduled-page']))
        ->assertNotFound();
});

test('pages show returns 404 for invalid slug', function () {
    $this->get(route('pages.show', ['published_page' => 'missing']))
        ->assertNotFound();
});

test('pages show preserves tip tap column block markup in content', function () {
    $columnHtml = '<div data-type="column-block" data-columns="2"><p>Text column</p><p><img src="/x.jpg" alt=""></p></div>';

    $page = Page::create([
        'title' => 'Column layout',
        'slug' => 'column-layout',
        'content' => $columnHtml,
        'published_at' => now()->subHour(),
    ]);

    $this->get(route('pages.show', ['published_page' => $page->slug]))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia
            ->where('page.content', $columnHtml));
});
