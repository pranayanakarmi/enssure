<?php

use Inertia\Testing\AssertableInertia as Assert;

test('returns a successful response', function () {
    $response = $this->get(route('home'));

    $response->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('Welcome')
        ->where('site.name', 'TechNova Labs')
        ->where('site.tagline', 'Practical AI, cloud, and product engineering for modern teams.')
        ->has('stats', 3)
        ->has('services', 3)
        ->has('articles', 3)
        ->where('updatedAt', now()->toDateString())
    );
});
