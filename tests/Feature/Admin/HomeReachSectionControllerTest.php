<?php

use App\Models\HomeReachSection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin home reach section edit', function () {
    $response = $this->get(route('admin.home_reach_sections.edit'));
    $response->assertRedirect(route('login'));
});

test('authenticated user without admin role cannot access admin home reach section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('user');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_reach_sections.edit'));
    $response->assertRedirect();
});

test('admin user can access admin home reach section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_reach_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/home_reach_sections/edit')
        ->has('homeReachSection')
    );
});

test('admin user can update home reach section', function () {
    $section = HomeReachSection::create([
        'badge_text' => 'Our Reach',
        'title' => 'Our Impact & Milestones',
        'description' => '<p>Original description</p>',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.home_reach_sections.update'), [
        'badge_text' => 'Updated Badge',
        'title' => 'Updated Title',
        'description' => '<p>Updated description</p>',
    ]);

    $response->assertRedirect();
    $section->refresh();
    expect($section->badge_text)->toBe('Updated Badge');
    expect($section->title)->toBe('Updated Title');
    expect($section->description)->toBe('<p>Updated description</p>');
});

test('home page returns home reach section when record exists', function () {
    HomeReachSection::create([
        'badge_text' => 'Our Reach',
        'title' => 'Our Impact & Milestones',
        'description' => '<p>Test description</p>',
    ]);

    $response = $this->get(route('home'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->has('homeReachSection')
        ->where('homeReachSection.badge_text', 'Our Reach')
        ->where('homeReachSection.title', 'Our Impact & Milestones')
    );
});

test('home page returns home reach section items when they exist', function () {
    $section = HomeReachSection::create([
        'badge_text' => 'Our Reach',
        'title' => 'Our Impact & Milestones',
        'description' => '<p>Test</p>',
    ]);
    $section->items()->create([
        'value' => '2500',
        'suffix' => '+',
        'label' => 'Apprenticeship',
        'link_url' => 'https://example.com',
        'order' => 0,
    ]);

    $response = $this->get(route('home'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->has('homeReachSection')
        ->has('homeReachSection.items')
        ->where('homeReachSection.items.0.value', '2500')
        ->where('homeReachSection.items.0.label', 'Apprenticeship')
        ->where('homeReachSection.items.0.link_url', 'https://example.com')
    );
});
