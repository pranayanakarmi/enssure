<?php

use App\Models\Gallery;
use App\Models\GalleryPageSection;

test('gallery page returns 200 with section, albums and partners', function () {
    GalleryPageSection::create([
        'title' => 'Test Title',
        'description' => 'Test description',
    ]);

    $response = $this->get(route('gallery'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Gallery')
        ->has('galleryPageSection')
        ->has('albums')
        ->has('partners')
    );
});

test('gallery page shows albums with cover and link to show', function () {
    $album = Gallery::create([
        'title' => 'Event 2024',
        'slug' => 'event-2024',
        'description' => null,
        'cover_image' => null,
    ]);

    $response = $this->get(route('gallery'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Gallery')
        ->where('albums.0.title', 'Event 2024')
        ->where('albums.0.slug', 'event-2024')
    );
});

test('gallery page includes ordered images for each album', function () {
    $album = Gallery::create([
        'title' => 'Album With Photos',
        'slug' => 'album-with-photos',
        'description' => null,
        'cover_image' => null,
    ]);

    $album->images()->create([
        'image_path' => 'gallery-images/one.jpg',
        'caption' => 'First',
        'order' => 0,
    ]);
    $album->images()->create([
        'image_path' => 'gallery-images/two.jpg',
        'caption' => 'Second',
        'order' => 1,
    ]);

    $response = $this->get(route('gallery'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Gallery')
        ->has('albums.0.images', 2)
        ->where('albums.0.images.0.caption', 'First')
        ->where('albums.0.images.1.caption', 'Second')
    );
});

test('gallery show returns 200 with gallery and images', function () {
    $gallery = Gallery::create([
        'title' => 'My Album',
        'slug' => 'my-album',
        'description' => 'Album description',
        'cover_image' => null,
    ]);

    $gallery->images()->create([
        'image_path' => 'gallery-images/test.jpg',
        'caption' => 'A caption',
        'order' => 0,
    ]);

    $response = $this->get(route('gallery.show', ['gallery' => 'my-album']));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('GalleryShow')
        ->has('gallery')
        ->where('gallery.title', 'My Album')
        ->where('gallery.slug', 'my-album')
        ->has('gallery.images', 1)
    );
});

test('gallery show returns 404 for invalid slug', function () {
    $response = $this->get(route('gallery.show', ['gallery' => 'non-existent-slug']));

    $response->assertNotFound();
});
