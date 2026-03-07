<?php

use App\Models\HomePartnersSection;
use App\Models\Partner;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin home partners section edit', function () {
    $response = $this->get(route('admin.home_partners_sections.edit'));
    $response->assertRedirect(route('login'));
});

test('authenticated user without admin role cannot access admin home partners section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('user');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_partners_sections.edit'));
    $response->assertRedirect();
});

test('admin user can access admin home partners section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_partners_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/home_partners_sections/edit')
        ->has('homePartnersSection')
    );
});

test('admin user can update home partners section', function () {
    $section = HomePartnersSection::create([
        'badge_text' => 'Our Partners',
        'title' => 'We work with the best Partners',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.home_partners_sections.update'), [
        'badge_text' => 'Partners',
        'title' => 'Trusted by leading organizations',
    ]);

    $response->assertRedirect();
    $section->refresh();
    expect($section->badge_text)->toBe('Partners');
    expect($section->title)->toBe('Trusted by leading organizations');
});

test('home page returns home partners section and partners when they exist', function () {
    HomePartnersSection::create([
        'badge_text' => 'Our Partners',
        'title' => 'We work with the best Partners',
    ]);

    Storage::fake('public');
    Partner::create([
        'name' => 'Partner A',
        'logo' => 'partners/logo.png',
        'order' => 0,
    ]);

    $response = $this->get(route('home'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->has('homePartnersSection')
        ->where('homePartnersSection.badge_text', 'Our Partners')
        ->where('homePartnersSection.title', 'We work with the best Partners')
        ->has('partners')
        ->where('partners.0.name', 'Partner A')
    );
});
