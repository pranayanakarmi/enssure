<?php

use App\Models\FooterColumn;
use Database\Seeders\FooterSeeder;

beforeEach(function () {
    $this->seed(FooterSeeder::class);
});

test('home page includes footer columns and footer setting in shared props', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('footerColumns')
        ->has('footerSetting')
        ->where('footerSetting.copyright_text', '© Copyright 2008 - 2026 enssure | Privacy Policy | Terms of Service')
    );
    expect(FooterColumn::count())->toBe(4);
});
