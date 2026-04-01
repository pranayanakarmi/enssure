<?php

use App\Models\PageHero;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access pages hero edit', function () {
    $response = $this->get(route('admin.pages.hero.edit'));
    $response->assertRedirect(route('login'));
});

test('admin user can access pages hero edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.pages.hero.edit'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/pages/hero_edit')
        ->has('pageHero')
    );
});

test('admin user can update pages hero image settings', function () {
    PageHero::create(['hero_image' => null]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.pages.hero.update'), [
        'remove_hero_image' => true,
    ]);

    $response->assertRedirect();
    expect(PageHero::first()->hero_image)->toBeNull();
});
