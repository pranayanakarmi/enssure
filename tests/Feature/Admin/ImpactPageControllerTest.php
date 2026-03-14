<?php

use App\Models\ImpactPageHero;
use App\Models\ImpactPageSection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin impact page hero edit', function () {
    $response = $this->get(route('admin.impact_page_hero.edit'));
    $response->assertRedirect(route('login'));
});

test('admin user can access admin impact page hero edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.impact_page_hero.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/impact_page/hero_edit')
        ->has('impactPageHero')
    );
});

test('admin user can update impact page hero', function () {
    $hero = ImpactPageHero::create([
        'title' => 'Impact Stories',
        'hero_image' => null,
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.impact_page_hero.update'), [
        'title' => 'Our Impact Stories',
    ]);

    $response->assertRedirect();
    $hero->refresh();
    expect($hero->title)->toBe('Our Impact Stories');
});

test('guests cannot access admin impact page section edit', function () {
    $response = $this->get(route('admin.impact_page_sections.edit'));
    $response->assertRedirect(route('login'));
});

test('admin user can access admin impact page section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.impact_page_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/impact_page/section_edit')
        ->has('impactPageSection')
    );
});

test('admin user can update impact page section', function () {
    $section = ImpactPageSection::create([
        'title' => 'Transforming Skills, Changing Lives',
        'description' => 'Original description',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.impact_page_sections.update'), [
        'title' => 'Updated Title',
        'description' => 'Updated description',
    ]);

    $response->assertRedirect();
    $section->refresh();
    expect($section->title)->toBe('Updated Title');
    expect($section->description)->toBe('Updated description');
});
