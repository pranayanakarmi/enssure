<?php

use App\Models\HomeSupportSection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin home support section edit', function () {
    $response = $this->get(route('admin.home_support_sections.edit'));
    $response->assertRedirect(route('login'));
});

test('authenticated user without admin role cannot access admin home support section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('user');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_support_sections.edit'));
    $response->assertRedirect();
});

test('admin user can access admin home support section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_support_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/home_support_sections/edit')
        ->has('homeSupportSection')
    );
});

test('admin user can update home support section', function () {
    $section = HomeSupportSection::create([
        'badge_text' => 'Support',
        'title' => 'Technical Assistance By',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.home_support_sections.update'), [
        'badge_text' => 'Our Support',
        'title' => 'Backed by expert partners',
    ]);

    $response->assertRedirect();
    $section->refresh();
    expect($section->badge_text)->toBe('Our Support');
    expect($section->title)->toBe('Backed by expert partners');
});

test('home page returns home support section when it exists', function () {
    HomeSupportSection::create([
        'badge_text' => 'Support',
        'title' => 'Technical Assistance By',
    ]);

    $response = $this->get(route('home'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->has('homeSupportSection')
        ->where('homeSupportSection.badge_text', 'Support')
        ->where('homeSupportSection.title', 'Technical Assistance By')
    );
});
