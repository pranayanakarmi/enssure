<?php

use App\Models\HomeNewsSection;
use App\Models\Notice;
use Inertia\Testing\AssertableInertia as Assert;

test('home page news ticker uses home news section notices in pivot order', function () {
    $second = Notice::create([
        'title' => 'Second notice',
        'slug' => 'second-notice',
        'content' => '<p>B</p>',
    ]);
    $first = Notice::create([
        'title' => 'First notice',
        'slug' => 'first-notice',
        'content' => '<p>A</p>',
    ]);

    $section = HomeNewsSection::create([
        'badge_text' => 'Updates',
        'title' => 'Latest News',
        'description' => '',
        'cta_text' => 'View all',
        'cta_url' => '/notices',
    ]);
    $section->notices()->sync([
        $first->id => ['order' => 0],
        $second->id => ['order' => 1],
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->has('newsTickerItems', 2)
        ->where('newsTickerItems.0.title', 'First notice')
        ->where('newsTickerItems.0.url', '/notices/first-notice')
        ->where('newsTickerItems.1.title', 'Second notice')
        ->where('newsTickerItems.1.url', '/notices/second-notice')
    );
});

test('home page news ticker returns at most twenty notices', function () {
    $section = HomeNewsSection::create([
        'badge_text' => 'Updates',
        'title' => 'Latest News',
        'description' => '',
        'cta_text' => 'View all',
        'cta_url' => '/notices',
    ]);

    $sync = [];
    for ($i = 0; $i < 25; $i++) {
        $n = Notice::create([
            'title' => "Notice {$i}",
            'slug' => "notice-{$i}",
            'content' => '<p>x</p>',
        ]);
        $sync[$n->id] = ['order' => $i];
    }
    $section->notices()->sync($sync);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->has('newsTickerItems', 20)
        ->where('newsTickerItems.0.title', 'Notice 0')
        ->where('newsTickerItems.19.title', 'Notice 19')
    );
});

test('home page news ticker is empty when no home news section exists', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->has('newsTickerItems', 0)
    );
});
