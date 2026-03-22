<?php

use App\Models\ContactFeedbackContent;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access contact feedback content edit', function () {
    $response = $this->get(route('admin.contact_feedback_content.edit'));
    $response->assertRedirect(route('login'));
});

test('admin user can access contact feedback content edit', function () {
    ContactFeedbackContent::create([
        'title' => 'Title',
        'description' => 'Body text.',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.contact_feedback_content.edit'));
    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/contact_feedback/content_edit')
        ->has('contactFeedbackContent')
        ->where('contactFeedbackContent.title', 'Title')
    );
});

test('admin user can update contact feedback content', function () {
    ContactFeedbackContent::create([
        'title' => 'Old',
        'description' => 'Old body.',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.contact_feedback_content.update'), [
        'title' => 'New title',
        'description' => 'New description paragraph.',
    ]);

    $response->assertRedirect();
    $content = ContactFeedbackContent::first();
    expect($content->title)->toBe('New title');
    expect($content->description)->toBe('New description paragraph.');
});
