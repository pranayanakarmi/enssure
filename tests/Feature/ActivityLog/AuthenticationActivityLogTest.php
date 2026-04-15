<?php

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Support\Facades\Http;

function fakeValidRecaptchaForActivityLog(): void
{
    Http::fake([
        'https://www.google.com/recaptcha/api/siteverify' => Http::response(['success' => true], 200),
    ]);
}

test('successful login creates auth login activity log', function () {
    fakeValidRecaptchaForActivityLog();

    /** @var User $user */
    $user = User::factory()->create();

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
        'g-recaptcha-response' => 'valid-token',
    ]);

    $response->assertRedirect(route('dashboard', absolute: false));

    $log = ActivityLog::query()->where('event', 'auth.login')->latest('id')->first();

    expect($log)->not->toBeNull();
    expect($log->actor_id)->toBe($user->id);
    expect($log->description)->toBe('User logged in');
});

test('logout creates auth logout activity log', function () {
    /** @var User $user */
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('logout'));

    $response->assertRedirect(route('home'));

    $log = ActivityLog::query()->where('event', 'auth.logout')->latest('id')->first();

    expect($log)->not->toBeNull();
    expect($log->actor_id)->toBe($user->id);
    expect($log->description)->toBe('User logged out');
});

test('failed login creates failed auth activity log without exposing password', function () {
    fakeValidRecaptchaForActivityLog();

    /** @var User $user */
    $user = User::factory()->create();

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'wrong-password',
        'g-recaptcha-response' => 'valid-token',
    ]);

    $response->assertSessionHasErrors('email');

    $log = ActivityLog::query()->where('event', 'auth.failed')->latest('id')->first();

    expect($log)->not->toBeNull();
    expect($log->actor_id)->toBeNull();
    expect($log->properties['credentials']['email'])->toBe($user->email);
    expect($log->properties['credentials']['password'] ?? null)->toBeNull();
});
