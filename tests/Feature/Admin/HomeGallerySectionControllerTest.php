<?php

use App\Models\Gallery;
use App\Models\HomeGallerySection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin home gallery section edit', function () {
    $response = $this->get(route('admin.home_gallery_sections.edit'));
    $response->assertRedirect(route('login'));
});

test('authenticated user without admin role cannot access admin home gallery section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('user');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_gallery_sections.edit'));
    $response->assertRedirect();
});

test('admin user can access admin home gallery section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_gallery_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/home_gallery_sections/edit')
        ->has('homeGallerySection')
        ->has('galleries')
    );
});

test('admin user can update home gallery section', function () {
    $section = HomeGallerySection::create([
        'badge_text' => 'Gallery',
        'title' => 'Original Title',
        'description' => 'Original description',
        'cta_text' => 'View all',
        'cta_url' => '#',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.home_gallery_sections.update'), [
        'badge_text' => 'Updated Badge',
        'title' => 'Updated Title',
        'description' => 'Updated description',
        'cta_text' => 'Explore gallery',
        'cta_url' => '/gallery',
        'gallery_ids' => [],
    ]);

    $response->assertRedirect();
    $section->refresh();
    expect($section->badge_text)->toBe('Updated Badge');
    expect($section->title)->toBe('Updated Title');
    expect($section->description)->toBe('Updated description');
    expect($section->cta_text)->toBe('Explore gallery');
    expect($section->cta_url)->toBe('/gallery');
});

test('admin user can update home gallery section with selected gallery albums', function () {
    $section = HomeGallerySection::create([
        'badge_text' => 'Gallery',
        'title' => 'Gallery Section',
        'description' => 'Description',
        'cta_text' => 'View all',
        'cta_url' => '/gallery',
    ]);

    $gallery1 = Gallery::create([
        'title' => 'Capacity development programs',
        'slug' => 'capacity-development-programs',
        'description' => null,
        'cover_image' => null,
    ]);
    $gallery2 = Gallery::create([
        'title' => 'Collaborative workshops',
        'slug' => 'collaborative-workshops',
        'description' => null,
        'cover_image' => null,
    ]);
    $gallery3 = Gallery::create([
        'title' => 'Documenting milestones',
        'slug' => 'documenting-milestones',
        'description' => null,
        'cover_image' => null,
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.home_gallery_sections.update'), [
        'badge_text' => 'Gallery',
        'title' => 'Gallery Section',
        'description' => 'Description',
        'cta_text' => 'View all',
        'cta_url' => '/gallery',
        'gallery_ids' => [$gallery2->id, $gallery1->id, $gallery3->id],
    ]);

    $response->assertRedirect();
    $section->refresh();
    $section->load('galleries');
    $orderedIds = $section->galleries->pluck('id')->values()->all();
    expect($orderedIds)->toBe([$gallery2->id, $gallery1->id, $gallery3->id]);
});

test('home page returns home gallery section when record exists', function () {
    HomeGallerySection::create([
        'badge_text' => 'Gallery',
        'title' => 'The ENSSURE Journey in Pictures',
        'description' => 'Visual record of our activities.',
        'cta_text' => 'View all gallery',
        'cta_url' => '#',
    ]);

    $response = $this->get(route('home'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->has('homeGallerySection')
        ->where('homeGallerySection.badge_text', 'Gallery')
        ->where('homeGallerySection.title', 'The ENSSURE Journey in Pictures')
        ->where('homeGallerySection.cta_text', 'View all gallery')
    );
});
