<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEventRequest;
use App\Http\Requests\Admin\UpdateEventRequest;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Event::class);

        $events = Event::orderByDesc('start_date')
            ->get()
            ->map(fn (Event $e) => [
                'id' => $e->id,
                'title' => $e->title,
                'slug' => $e->slug,
                'event_type' => $e->event_type,
                'start_date' => $e->start_date?->toISOString(),
                'end_date' => $e->end_date?->toISOString(),
                'venue' => $e->venue,
                'registration_required' => $e->registration_required,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/events/index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Event::class);

        return Inertia::render('admin/events/create');
    }

    public function store(StoreEventRequest $request): RedirectResponse
    {
        Event::create($request->validated());

        return to_route('admin.events.index')
            ->with('success', 'Event created successfully.');
    }

    public function edit(Event $event): Response
    {
        $this->authorize('update', $event);

        $event->load(['registrations' => fn ($q) => $q->orderBy('id')]);
        $e = $event;

        return Inertia::render('admin/events/edit', [
            'event' => [
                'id' => $e->id,
                'title' => $e->title,
                'slug' => $e->slug,
                'description' => $e->description,
                'event_type' => $e->event_type,
                'start_date' => $e->start_date?->toISOString(),
                'end_date' => $e->end_date?->toISOString(),
                'venue' => $e->venue,
                'address' => $e->address,
                'organizer' => $e->organizer,
                'contact_person' => $e->contact_person,
                'contact_email' => $e->contact_email,
                'contact_phone' => $e->contact_phone,
                'registration_required' => $e->registration_required,
                'registration_deadline' => $e->registration_deadline?->toDateString(),
                'max_participants' => $e->max_participants,
                'featured_image' => $e->featured_image,
                'registrations' => $e->registrations->map(fn ($r) => [
                    'id' => $r->id,
                    'name' => $r->name,
                    'email' => $r->email,
                    'status' => $r->status,
                ])->values()->all(),
            ],
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event): RedirectResponse
    {
        $event->update($request->validated());

        return to_route('admin.events.index')
            ->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $this->authorize('delete', $event);

        $event->delete();

        return to_route('admin.events.index')
            ->with('success', 'Event deleted successfully.');
    }
}
