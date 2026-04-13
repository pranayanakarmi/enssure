<?php

use App\Models\Event;

test('events index returns upcoming and past events', function () {
    Event::create([
        'title' => 'Future Conference',
        'slug' => 'future-conference',
        'description' => 'An upcoming health informatics conference.',
        'event_type' => 'Conference',
        'start_date' => now()->addMonth(),
        'venue' => 'KMH-IHS Auditorium',
    ]);

    Event::create([
        'title' => 'Past Workshop',
        'slug' => 'past-workshop',
        'description' => 'A completed workshop on clinical data.',
        'event_type' => 'Workshop',
        'start_date' => now()->subMonth(),
        'venue' => 'Computer Lab',
    ]);

    $response = $this->get(route('events.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Events')
        ->has('upcomingEvents')
        ->has('pastEvents')
        ->where('upcomingEvents.0.title', 'Future Conference')
        ->where('pastEvents.0.title', 'Past Workshop')
    );
});

test('events index returns empty arrays when no events exist', function () {
    $response = $this->get(route('events.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Events')
        ->has('upcomingEvents')
        ->has('pastEvents')
        ->where('upcomingEvents', [])
        ->where('pastEvents', [])
    );
});

test('events show returns event detail for valid slug', function () {
    $event = Event::create([
        'title' => 'Health IT Seminar',
        'slug' => 'health-it-seminar',
        'description' => 'A seminar on health information technology.',
        'event_type' => 'Seminar',
        'start_date' => now()->addWeeks(2),
        'venue' => 'Seminar Hall',
        'contact_email' => 'info@kmh-ihs.edu.np',
    ]);

    $response = $this->get(route('events.show', ['event' => $event->slug]));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('EventShow')
        ->has('event')
        ->where('event.title', 'Health IT Seminar')
        ->where('event.slug', 'health-it-seminar')
        ->where('event.event_type', 'Seminar')
        ->has('relatedEvents')
    );
});

test('events show returns 404 for invalid slug', function () {
    $response = $this->get(route('events.show', ['event' => 'non-existent-event']));

    $response->assertNotFound();
});

test('events show includes related events excluding current', function () {
    $event = Event::create([
        'title' => 'Main Event',
        'slug' => 'main-event',
        'event_type' => 'Conference',
        'start_date' => now()->addMonth(),
    ]);

    Event::create([
        'title' => 'Other Event',
        'slug' => 'other-event',
        'event_type' => 'Workshop',
        'start_date' => now()->addMonths(2),
    ]);

    $response = $this->get(route('events.show', ['event' => $event->slug]));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('EventShow')
        ->where('event.id', $event->id)
        ->has('relatedEvents', 1)
        ->where('relatedEvents.0.title', 'Other Event')
    );
});
