<?php

use App\Models\HomeAboutSection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin home about section edit', function () {
    $response = $this->get(route('admin.home_about_sections.edit'));
    $response->assertRedirect(route('login'));
});

test('authenticated user without admin role cannot access admin home about section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('user');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_about_sections.edit'));
    $response->assertRedirect();
});

test('admin user can access admin home about section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_about_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/home_about_sections/edit')
        ->has('homeAboutSection')
    );
});

test('admin user can update home about section', function () {
    $section = HomeAboutSection::create([
        'badge_text' => 'About us',
        'title' => 'Original Title',
        'body' => '<p>Original body</p>',
        'card_title' => 'Card Title',
        'cta_text' => 'Read more',
        'cta_url' => '/about',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.home_about_sections.update'), [
        'badge_text' => 'Updated Badge',
        'title' => 'Updated Title',
        'body' => '<p>Updated body</p>',
        'card_title' => 'Updated Card',
        'cta_text' => 'Explore',
        'cta_url' => '#',
    ]);

    $response->assertRedirect();
    $section->refresh();
    expect($section->badge_text)->toBe('Updated Badge');
    expect($section->title)->toBe('Updated Title');
    expect($section->body)->toBe('<p>Updated body</p>');
    expect($section->card_title)->toBe('Updated Card');
    expect($section->cta_text)->toBe('Explore');
    expect($section->cta_url)->toBe('#');
});

test('home page returns home about section when record exists', function () {
    HomeAboutSection::create([
        'badge_text' => 'About us',
        'title' => 'ENSSURE Project',
        'body' => '<p>Project description</p>',
        'card_title' => 'Skill Upgrading',
        'cta_text' => 'Explore more',
        'cta_url' => '#',
    ]);

    $response = $this->get(route('home'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->has('homeAboutSection')
        ->where('homeAboutSection.badge_text', 'About us')
        ->where('homeAboutSection.title', 'ENSSURE Project')
        ->where('homeAboutSection.cta_text', 'Explore more')
    );
});
