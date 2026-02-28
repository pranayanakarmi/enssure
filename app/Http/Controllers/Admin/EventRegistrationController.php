<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEventRegistrationRequest;
use App\Http\Requests\Admin\UpdateEventRegistrationRequest;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EventRegistrationController extends Controller
{
    public function store(StoreEventRegistrationRequest $request, Event $event): RedirectResponse
    {
        $event->registrations()->create($request->validated());

        return back()->with('success', 'Registration added.');
    }

    public function edit(EventRegistration $event_registration): Response
    {
        $this->authorize('update', $event_registration);

        $event_registration->load('event');

        return Inertia::render('admin/events/event-registrations/edit', [
            'eventRegistration' => [
                'id' => $event_registration->id,
                'event_id' => $event_registration->event_id,
                'name' => $event_registration->name,
                'email' => $event_registration->email,
                'phone' => $event_registration->phone,
                'additional_info' => $event_registration->additional_info,
                'status' => $event_registration->status ?? 'pending',
            ],
            'event' => [
                'id' => $event_registration->event->id,
                'title' => $event_registration->event->title,
            ],
        ]);
    }

    public function update(UpdateEventRegistrationRequest $request, EventRegistration $event_registration): RedirectResponse
    {
        $event_registration->update($request->validated());

        return redirect()->route('admin.events.edit', $event_registration->event_id)
            ->with('success', 'Registration updated.');
    }

    public function destroy(EventRegistration $event_registration): RedirectResponse
    {
        $this->authorize('delete', $event_registration);

        $event_id = $event_registration->event_id;
        $event_registration->delete();

        return redirect()->route('admin.events.edit', $event_id)
            ->with('success', 'Registration deleted.');
    }
}
