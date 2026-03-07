<?php

use App\Models\HomeImpactStoriesSection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin home impact stories section edit', function () {
    $response = $this->get(route('admin.home_impact_stories_sections.edit'));
    $response->assertRedirect(route('login'));
});

test('authenticated user without admin role cannot access admin home impact stories section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('user');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_impact_stories_sections.edit'));
    $response->assertRedirect();
});

test('admin user can access admin home impact stories section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_impact_stories_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/home_impact_stories_sections/edit')
        ->has('homeImpactStoriesSection')
    );
});

test('admin user can update home impact stories section', function () {
    $section = HomeImpactStoriesSection::create([
        'badge_text' => 'Impact Stories',
        'title' => 'Original Title',
        'description' => 'Original description',
        'cta_text' => 'View all',
        'cta_url' => '#',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.home_impact_stories_sections.update'), [
        'badge_text' => 'Updated Badge',
        'title' => 'Updated Title',
        'description' => 'Updated description',
        'cta_text' => 'Explore stories',
        'cta_url' => '/impact-stories',
    ]);

    $response->assertRedirect();
    $section->refresh();
    expect($section->badge_text)->toBe('Updated Badge');
    expect($section->title)->toBe('Updated Title');
    expect($section->description)->toBe('Updated description');
    expect($section->cta_text)->toBe('Explore stories');
    expect($section->cta_url)->toBe('/impact-stories');
});

test('home page returns home impact stories section when record exists', function () {
    HomeImpactStoriesSection::create([
        'badge_text' => 'Impact Stories',
        'title' => 'Transforming Skills, Changing Lives',
        'description' => 'See how practical apprenticeship training turns potential into progress.',
        'cta_text' => 'View all stories',
        'cta_url' => '#',
    ]);

    $response = $this->get(route('home'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->has('homeImpactStoriesSection')
        ->where('homeImpactStoriesSection.badge_text', 'Impact Stories')
        ->where('homeImpactStoriesSection.title', 'Transforming Skills, Changing Lives')
        ->where('homeImpactStoriesSection.cta_text', 'View all stories')
    );
});
