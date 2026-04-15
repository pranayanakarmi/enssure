<?php

use App\Models\ImportantPopup;
use Inertia\Testing\AssertableInertia as Assert;

test('home shares null important notice when no popup is active', function () {
    ImportantPopup::create([
        'title' => 'Inactive popup',
        'description' => 'Should not show',
        'is_active' => false,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->where('importantNotice', null)
    );
});

test('home shares active important popup modal data', function () {
    $popup = ImportantPopup::create([
        'title' => 'Urgent maintenance update',
        'description' => 'Custom popup message for urgent update.',
        'cta_text' => 'Check Details',
        'cta_url' => 'https://example.org/updates/urgent-maintenance',
        'is_active' => true,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->where('importantNotice.id', $popup->id)
        ->where('importantNotice.title', 'Urgent maintenance update')
        ->where('importantNotice.description', 'Custom popup message for urgent update.')
        ->where('importantNotice.image_url', null)
        ->where('importantNotice.cta_text', 'Check Details')
        ->where('importantNotice.cta_url', 'https://example.org/updates/urgent-maintenance')
    );
});

test('home shared active important popup data falls back for missing CTA text', function () {
    $popup = ImportantPopup::create([
        'title' => 'Fallback popup',
        'description' => '<p>Fallback description content.</p>',
        'cta_url' => 'https://example.org/fallback-popup',
        'is_active' => true,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->where('importantNotice.id', $popup->id)
        ->where('importantNotice.description', 'Fallback description content.')
        ->where('importantNotice.cta_text', 'Learn More')
        ->where('importantNotice.cta_url', 'https://example.org/fallback-popup')
    );
});

test('home shares the latest updated active popup for modal', function () {
    $older = ImportantPopup::create([
        'title' => 'Older active popup',
        'description' => 'Old content',
        'is_active' => true,
    ]);

    $latest = ImportantPopup::create([
        'title' => 'Latest active popup',
        'description' => 'Latest content',
        'is_active' => true,
    ]);

    $older->update(['updated_at' => now()->subDay()]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->where('importantNotice.id', $latest->id)
        ->where('importantNotice.title', 'Latest active popup')
    );
});

test('non-home pages do not share important popup modal data', function () {
    ImportantPopup::create([
        'title' => 'Home-only popup',
        'description' => 'This should only be available on home page.',
        'is_active' => true,
    ]);

    $response = $this->get(route('contact'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->where('importantNotice', null)
    );
});
