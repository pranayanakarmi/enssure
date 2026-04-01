<?php

use App\Models\PostHero;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access posts hero edit', function () {
    $response = $this->get(route('admin.posts.hero.edit'));
    $response->assertRedirect(route('login'));
});

test('admin user can access posts hero edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.posts.hero.edit'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/posts/hero_edit')
        ->has('postHero')
    );
});

test('admin user can update posts hero image settings', function () {
    PostHero::create(['hero_image' => null]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.posts.hero.update'), [
        'remove_hero_image' => true,
    ]);

    $response->assertRedirect();
    expect(PostHero::first()->hero_image)->toBeNull();
});
