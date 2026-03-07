<?php

use App\Models\HomeContactCtaSection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin home contact cta section edit', function () {
    $response = $this->get(route('admin.home_contact_cta_sections.edit'));
    $response->assertRedirect(route('login'));
});

test('authenticated user without admin role cannot access admin home contact cta section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('user');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_contact_cta_sections.edit'));
    $response->assertRedirect();
});

test('admin user can access admin home contact cta section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_contact_cta_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/home_contact_cta_sections/edit')
        ->has('homeContactCtaSection')
    );
});

test('admin user can update home contact cta section', function () {
    $section = HomeContactCtaSection::create([
        'badge_text' => 'JOIN US',
        'title' => 'Build Skills, Build Futures. Support sustainable employment today.',
        'highlight_phrase' => 'Support sustainable',
        'button_text' => 'Contact us',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.home_contact_cta_sections.update'), [
        'badge_text' => 'Get in touch',
        'title' => 'Ready to start? Join our program today.',
        'highlight_phrase' => 'Join our program',
        'button_text' => 'Get started',
    ]);

    $response->assertRedirect();
    $section->refresh();
    expect($section->badge_text)->toBe('Get in touch');
    expect($section->title)->toBe('Ready to start? Join our program today.');
    expect($section->highlight_phrase)->toBe('Join our program');
    expect($section->button_text)->toBe('Get started');
});

test('home page returns home contact cta section when it exists', function () {
    HomeContactCtaSection::create([
        'badge_text' => 'JOIN US',
        'title' => 'Build Skills, Build Futures. Support sustainable employment today.',
        'highlight_phrase' => 'Support sustainable',
        'button_text' => 'Contact us',
    ]);

    $response = $this->get(route('home'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->has('homeContactCtaSection')
        ->where('homeContactCtaSection.badge_text', 'JOIN US')
        ->where('homeContactCtaSection.title', 'Build Skills, Build Futures. Support sustainable employment today.')
        ->where('homeContactCtaSection.button_text', 'Contact us')
    );
});
