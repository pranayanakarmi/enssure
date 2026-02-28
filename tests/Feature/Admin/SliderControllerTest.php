<?php

use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin sliders index', function () {
    $response = $this->get(route('admin.sliders.index'));
    $response->assertRedirect(route('login'));
});

test('authenticated user without admin role cannot access admin sliders index', function () {
    $user = User::factory()->create();
    $user->assignRole('user');
    $this->actingAs($user);

    $response = $this->get(route('admin.sliders.index'));
    $response->assertRedirect();
});

test('admin user can access admin sliders index', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.sliders.index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/sliders/index')
        ->has('sliders')
    );
});

test('admin user can create slider', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('admin.sliders.store'), [
        'name' => 'Home hero',
        'location' => 'home',
    ]);
    $response->assertRedirect(route('admin.sliders.index'));
    $this->assertDatabaseHas('sliders', ['name' => 'Home hero']);
});
