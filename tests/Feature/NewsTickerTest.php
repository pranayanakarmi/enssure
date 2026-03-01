<?php

use App\Models\NewsTickerItem;
use Inertia\Testing\AssertableInertia as Assert;

test('home page receives news ticker items from shared props', function () {
    NewsTickerItem::create([
        'title' => 'First headline',
        'url' => null,
        'order' => 0,
        'is_published' => true,
    ]);

    NewsTickerItem::create([
        'title' => 'Second headline',
        'url' => '/posts/slug',
        'order' => 1,
        'is_published' => true,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->has('newsTickerItems', 2)
        ->where('newsTickerItems.0.title', 'First headline')
        ->where('newsTickerItems.0.url', null)
        ->where('newsTickerItems.1.title', 'Second headline')
        ->where('newsTickerItems.1.url', '/posts/slug')
    );
});

test('news ticker only returns published items ordered by order', function () {
    NewsTickerItem::create([
        'title' => 'Draft',
        'url' => null,
        'order' => 2,
        'is_published' => false,
    ]);

    NewsTickerItem::create([
        'title' => 'Published second',
        'url' => null,
        'order' => 1,
        'is_published' => true,
    ]);

    NewsTickerItem::create([
        'title' => 'Published first',
        'url' => null,
        'order' => 0,
        'is_published' => true,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->has('newsTickerItems', 2)
        ->where('newsTickerItems.0.title', 'Published first')
        ->where('newsTickerItems.1.title', 'Published second')
    );
});
