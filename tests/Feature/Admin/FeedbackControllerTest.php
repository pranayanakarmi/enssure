<?php

use App\Models\Feedback;
use App\Models\PublicContactFeedbackSource;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('admin feedback index displays feedback type and view link data', function () {
    Feedback::create([
        'feedback_type' => 'complaint',
        'feedbackable_type' => PublicContactFeedbackSource::class,
        'feedbackable_id' => 1,
        'name' => 'Test User',
        'email' => 'test@example.com',
        'feedback_text' => 'This is a complaint message with enough content.',
        'is_public' => false,
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $this->get(route('admin.feedback.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/feedback/index')
            ->has('feedback', 1)
            ->where('feedback.0.feedback_type', 'complaint')
            ->where('feedback.0.name', 'Test User')
        );
});

test('admin can view feedback details page', function () {
    $feedback = Feedback::create([
        'feedback_type' => 'feedback',
        'feedbackable_type' => PublicContactFeedbackSource::class,
        'feedbackable_id' => 1,
        'name' => 'Viewer User',
        'email' => 'viewer@example.com',
        'feedback_text' => 'Detailed feedback message content for viewing.',
        'is_public' => false,
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $this->get(route('admin.feedback.show', $feedback))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/feedback/show')
            ->where('feedback.id', $feedback->id)
            ->where('feedback.feedback_type', 'feedback')
            ->where('feedback.email', 'viewer@example.com')
        );
});
