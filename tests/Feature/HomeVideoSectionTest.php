<?php

use App\Models\User;
use App\Models\Video;

test('admin can store a video as hero', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('admin.videos.store'), [
        'title' => 'Stored Hero Video',
        'video_url' => 'https://www.youtube.com/watch?v=storedHero123',
        'date' => '2026-04-15',
        'order' => 1,
        'is_active' => '1',
        'is_hero' => '1',
    ]);

    $response->assertRedirect(route('admin.videos.index'));

    $this->assertDatabaseHas('videos', [
        'title' => 'Stored Hero Video',
        'is_active' => true,
        'is_hero' => true,
    ]);
});

test('admin can unset hero video on update', function () {
    $this->actingAs(User::factory()->create());

    $video = Video::factory()->hero()->create([
        'title' => 'Existing Hero',
    ]);

    $response = $this->put(route('admin.videos.update', $video), [
        'title' => 'Existing Hero',
        'video_url' => $video->video_url,
        'date' => optional($video->date)->toDateString(),
        'order' => $video->order,
        'is_active' => '1',
        'is_hero' => '0',
    ]);

    $response->assertRedirect(route('admin.videos.index'));

    expect($video->fresh()->is_hero)->toBeFalse();
});

test('admin can update hero flag through method spoofed form submission', function () {
    $this->actingAs(User::factory()->create());

    $video = Video::factory()->create([
        'title' => 'Spoofed Update Video',
        'is_active' => true,
        'is_hero' => false,
    ]);

    $response = $this->post(route('admin.videos.update', $video), [
        '_method' => 'put',
        'title' => 'Spoofed Update Video',
        'video_url' => $video->video_url,
        'date' => optional($video->date)->toDateString(),
        'order' => $video->order,
        'is_active' => '1',
        'is_hero' => '1',
    ]);

    $response->assertRedirect(route('admin.videos.index'));

    expect($video->fresh()->is_hero)->toBeTrue();
});

test('home page exposes dedicated hero video when one is selected', function () {
    Video::factory()->create([
        'title' => 'Regular Video',
        'video_url' => 'https://www.youtube.com/watch?v=regular123',
        'order' => 2,
        'is_active' => true,
        'is_hero' => false,
    ]);

    Video::factory()->hero()->create([
        'title' => 'Hero Video',
        'video_url' => 'https://www.youtube.com/watch?v=hero123',
        'order' => 10,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->where('homeVideoSection.hero_video_url', 'https://www.youtube.com/watch?v=hero123')
        ->where('homeVideoSection.hero_video_title', 'Hero Video')
    );
});

test('home page falls back to first active video when no hero is selected', function () {
    Video::factory()->create([
        'title' => 'First Active Video',
        'video_url' => 'https://www.youtube.com/watch?v=firstActive',
        'order' => 1,
        'is_active' => true,
        'is_hero' => false,
    ]);

    Video::factory()->create([
        'title' => 'Second Active Video',
        'video_url' => 'https://www.youtube.com/watch?v=secondActive',
        'order' => 2,
        'is_active' => true,
        'is_hero' => false,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->where('homeVideoSection.hero_video_url', 'https://www.youtube.com/watch?v=firstActive')
        ->where('homeVideoSection.hero_video_title', 'First Active Video')
    );
});
