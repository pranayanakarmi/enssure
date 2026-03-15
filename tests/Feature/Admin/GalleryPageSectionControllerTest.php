<?php

use App\Models\GalleryPageSection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin gallery page section edit', function () {
    $response = $this->get(route('admin.gallery_page_section.edit'));

    $response->assertRedirect(route('login'));
});

test('admin user can access gallery page section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.gallery_page_section.edit'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/gallery_page_section/edit')
        ->has('galleryPageSection')
    );
});

test('admin user can update gallery page section', function () {
    GalleryPageSection::create([
        'title' => 'Original Title',
        'description' => 'Original description',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.gallery_page_section.update'), [
        'title' => 'Updated Gallery Title',
        'description' => 'Updated intro text for the gallery page.',
    ]);

    $response->assertRedirect();
    $section = GalleryPageSection::first();
    expect($section->title)->toBe('Updated Gallery Title');
    expect($section->description)->toBe('Updated intro text for the gallery page.');
});
