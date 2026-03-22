<?php

use App\Models\Feedback;
use App\Models\PublicContactFeedbackSource;

test('guest can submit contact feedback and it is stored', function () {
    $response = $this->from(route('contact'))->post(route('contact.feedback.store'), [
        'name' => 'Public User',
        'email' => 'user@example.com',
        'feedback_text' => 'This is a detailed message for the team.',
    ]);

    $response->assertRedirect(route('contact'));
    $response->assertSessionHas('success');

    $feedback = Feedback::query()->first();
    expect($feedback)->not->toBeNull();
    expect($feedback->name)->toBe('Public User');
    expect($feedback->email)->toBe('user@example.com');
    expect($feedback->feedback_text)->toContain('detailed message');
    expect($feedback->feedback_type)->toBe('contact');
    expect($feedback->feedbackable_type)->toBe(PublicContactFeedbackSource::class);
    expect((int) $feedback->feedbackable_id)->toBe(1);
});

test('contact feedback requires email and minimum message length', function () {
    $response = $this->from(route('contact'))->post(route('contact.feedback.store'), [
        'name' => null,
        'email' => '',
        'feedback_text' => 'short',
    ]);

    $response->assertSessionHasErrors(['email', 'feedback_text']);
    expect(Feedback::query()->count())->toBe(0);
});
