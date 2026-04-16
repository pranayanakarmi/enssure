<?php

use App\Models\HomeTestimonialsSection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('admin user can update home testimonials section description', function () {
    $section = HomeTestimonialsSection::create([
        'badge_text' => 'Testimonials',
        'title' => 'Initial title',
        'description' => 'Initial description',
    ]);

    /** @var User $admin */
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    $this->actingAs($admin);

    $response = $this->put(route('admin.home_testimonials_sections.update'), [
        'badge_text' => 'Updated testimonials',
        'title' => 'Updated title',
        'description' => 'Updated description from admin.',
    ]);

    $response->assertRedirect();

    $section->refresh();
    expect($section->badge_text)->toBe('Updated testimonials');
    expect($section->title)->toBe('Updated title');
    expect($section->description)->toBe('Updated description from admin.');
});

test('home page returns home testimonials section description when record exists', function () {
    HomeTestimonialsSection::create([
        'badge_text' => 'Testimonials',
        'title' => 'Voices from the field',
        'description' => 'Stories from apprentices and employers.',
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->where('homeTestimonialsSection.badge_text', 'Testimonials')
        ->where('homeTestimonialsSection.title', 'Voices from the field')
        ->where('homeTestimonialsSection.description', 'Stories from apprentices and employers.')
    );
});
