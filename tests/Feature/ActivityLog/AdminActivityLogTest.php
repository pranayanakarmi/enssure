<?php

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Support\Carbon;
use Spatie\Permission\Models\Role;

test('admin write request is logged with redacted password', function () {
    Role::findOrCreate('super_admin', 'web');
    Role::findOrCreate('admin', 'web');

    /** @var User $admin */
    $admin = User::factory()->create();
    $admin->assignRole('super_admin');

    $response = $this->actingAs($admin)->post(route('admin.users.store'), [
        'name' => 'Created User',
        'email' => 'created@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'roles' => ['admin'],
    ]);

    $response->assertRedirect(route('admin.users.index'));

    $log = ActivityLog::query()->where('event', 'request.post')->latest('id')->first();

    expect($log)->not->toBeNull();
    expect($log->actor_id)->toBe($admin->id);
    expect($log->properties['input']['password'])->toBe('[redacted]');
    expect($log->properties['input']['password_confirmation'])->toBe('[redacted]');
});

test('admin can open activity logs listing page', function () {
    Role::findOrCreate('super_admin', 'web');

    /** @var User $admin */
    $admin = User::factory()->create();
    $admin->assignRole('super_admin');

    $response = $this->actingAs($admin)->get(route('admin.activity_logs.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('admin/activity_logs/index'));
});

test('admin update request logs before and after changes', function () {
    Role::findOrCreate('super_admin', 'web');
    Role::findOrCreate('admin', 'web');

    /** @var User $admin */
    $admin = User::factory()->create();
    $admin->assignRole('super_admin');

    /** @var User $targetUser */
    $targetUser = User::factory()->create([
        'name' => 'Old Name',
        'email' => 'old@example.com',
    ]);
    $targetUser->assignRole('admin');

    $response = $this->actingAs($admin)->put(route('admin.users.update', $targetUser), [
        'name' => 'New Name',
        'email' => 'new@example.com',
        'roles' => ['admin'],
    ]);

    $response->assertRedirect(route('admin.users.index'));

    $log = ActivityLog::query()->where('event', 'request.put')->latest('id')->first();

    expect($log)->not->toBeNull();
    expect($log->subject_type)->toBe(User::class);
    expect($log->subject_id)->toBe($targetUser->id);
    expect($log->properties['changes']['before']['name'])->toBe('Old Name');
    expect($log->properties['changes']['after']['name'])->toBe('New Name');
    expect($log->properties['changes']['before']['email'])->toBe('old@example.com');
    expect($log->properties['changes']['after']['email'])->toBe('new@example.com');
});

test('admin can export filtered activity logs as csv', function () {
    Role::findOrCreate('super_admin', 'web');

    /** @var User $admin */
    $admin = User::factory()->create();
    $admin->assignRole('super_admin');

    ActivityLog::query()->create([
        'actor_id' => $admin->id,
        'actor_name' => $admin->name,
        'actor_role' => 'super_admin',
        'event' => 'auth.login',
        'description' => 'User logged in',
        'properties' => [],
    ]);

    ActivityLog::query()->create([
        'actor_id' => $admin->id,
        'actor_name' => $admin->name,
        'actor_role' => 'super_admin',
        'event' => 'request.put',
        'description' => 'PUT admin/users/1',
        'properties' => [],
    ]);

    $response = $this->actingAs($admin)->get(route('admin.activity_logs.export', [
        'event' => 'auth.login',
    ]));

    $response->assertOk();
    $response->assertHeader('content-type', 'text/csv; charset=UTF-8');

    $csv = $response->streamedContent();

    expect($csv)->toContain('auth.login');
    expect($csv)->not->toContain('request.put');
});

test('activity logs older than retention are pruned', function () {
    config()->set('activity_log.retention_days', 30);

    $oldLog = ActivityLog::query()->create([
        'event' => 'auth.login',
        'description' => 'Old log',
        'properties' => [],
    ]);
    $oldLog->forceFill([
        'created_at' => Carbon::now()->subDays(31),
        'updated_at' => Carbon::now()->subDays(31),
    ])->save();

    $recentLog = ActivityLog::query()->create([
        'event' => 'auth.login',
        'description' => 'Recent log',
        'properties' => [],
    ]);

    $this->artisan('model:prune', ['--model' => [ActivityLog::class]])->assertSuccessful();

    expect(ActivityLog::query()->whereKey($oldLog->id)->exists())->toBeFalse();
    expect(ActivityLog::query()->whereKey($recentLog->id)->exists())->toBeTrue();
});
