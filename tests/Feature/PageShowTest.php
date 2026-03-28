<?php

use App\Models\Page;
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
