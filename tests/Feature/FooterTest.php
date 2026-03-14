<?php

use App\Models\FooterColumn;
use Database\Seeders\FooterSeeder;

beforeEach(function () {
    $this->seed(FooterSeeder::class);
});

test('home page includes footer columns and site setting in shared props', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('footerColumns')
        ->has('siteSetting')
        ->has('siteSetting.header_phone_1')
        ->has('siteSetting.header_email')
        ->has('siteSetting.social_links')
    );
    expect(FooterColumn::count())->toBe(4);
});
