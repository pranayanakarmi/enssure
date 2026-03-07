<?php

use App\Models\HomeCoverageSection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin home coverage section edit', function () {
    $response = $this->get(route('admin.home_coverage_sections.edit'));
    $response->assertRedirect(route('login'));
});

test('authenticated user without admin role cannot access admin home coverage section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('user');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_coverage_sections.edit'));
    $response->assertRedirect();
});

test('admin user can access admin home coverage section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_coverage_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/home_coverage_sections/edit')
        ->has('homeCoverageSection')
    );
});

test('admin user can update home coverage section', function () {
    $section = HomeCoverageSection::create([
        'badge_text' => 'Coverage',
        'title' => 'Reaching Across the Nation',
        'description' => '<p>Original description</p>',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.home_coverage_sections.update'), [
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

test('home page returns home coverage section when record exists', function () {
    $section = HomeCoverageSection::create([
        'badge_text' => 'Coverage',
        'title' => 'Reaching Across the Nation',
        'description' => '<p>ENSSURE project coverage.</p>',
    ]);
    $section->items()->create([
        'value' => '308',
        'label' => 'Planned Events',
        'order' => 0,
    ]);

    $response = $this->get(route('home'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->has('homeCoverageSection')
        ->where('homeCoverageSection.badge_text', 'Coverage')
        ->where('homeCoverageSection.title', 'Reaching Across the Nation')
        ->has('homeCoverageSection.items')
        ->where('homeCoverageSection.items.0.value', '308')
        ->where('homeCoverageSection.items.0.label', 'Planned Events')
    );
});
