<?php

use App\Models\Event;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin events index', function () {
    $response = $this->get(route('admin.events.index'));
    $response->assertRedirect(route('login'));
});

test('admin user can access admin events index', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.events.index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/events/index')
        ->has('events')
    );
});

test('admin user can access admin events create', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.events.create'));
    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page->component('admin/events/create'));
});

test('admin user can access admin events edit', function () {
    $event = Event::create([
        'title' => 'Editable Event',
        'slug' => 'editable-event',
        'event_type' => 'Conference',
        'start_date' => now()->addMonth(),
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.events.edit', $event));
    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/events/edit')
        ->has('event')
        ->where('event.id', $event->id)
        ->where('event.title', 'Editable Event')
    );
});

test('admin user can create an event', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('admin.events.store'), [
        'title' => 'New Informatics Event',
        'event_type' => 'Workshop',
        'start_date' => now()->addWeeks(4)->format('Y-m-d H:i:s'),
        'venue' => 'IHS Computer Lab',
    ]);

    $response->assertRedirect(route('admin.events.index'));

    $event = Event::where('title', 'New Informatics Event')->first();
    expect($event)->not->toBeNull();
    expect($event->event_type)->toBe('Workshop');
    expect($event->venue)->toBe('IHS Computer Lab');
});

test('admin user can update an event', function () {
    $event = Event::create([
        'title' => 'Original Event Title',
        'slug' => 'original-event-title',
        'event_type' => 'Seminar',
        'start_date' => now()->addMonth(),
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.events.update', $event), [
        'title' => 'Updated Event Title',
        'slug' => 'updated-event-title',
        'event_type' => 'Conference',
        'start_date' => now()->addMonths(2)->format('Y-m-d H:i:s'),
    ]);

    $response->assertRedirect(route('admin.events.index'));

    $event->refresh();
    expect($event->title)->toBe('Updated Event Title');
    expect($event->event_type)->toBe('Conference');
});

test('admin user can delete an event', function () {
    $event = Event::create([
        'title' => 'Event To Delete',
        'slug' => 'event-to-delete',
        'event_type' => 'Training',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->delete(route('admin.events.destroy', $event));

    $response->assertRedirect(route('admin.events.index'));
    expect(Event::find($event->id))->toBeNull();
});

test('event creation requires a title', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('admin.events.store'), [
        'title' => '',
        'event_type' => 'Workshop',
    ]);

    $response->assertSessionHasErrors(['title']);
    expect(Event::count())->toBe(0);
});
