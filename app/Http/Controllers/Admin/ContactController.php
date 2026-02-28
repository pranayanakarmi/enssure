<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreContactRequest;
use App\Http\Requests\Admin\UpdateContactRequest;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Contact::class);

        $contacts = Contact::orderByDesc('id')
            ->get()
            ->map(fn (Contact $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'email' => $c->email,
                'subject' => $c->subject,
                'replied_at' => $c->replied_at?->toISOString(),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/contacts/index', [
            'contacts' => $contacts,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Contact::class);

        return Inertia::render('admin/contacts/create');
    }

    public function store(StoreContactRequest $request): RedirectResponse
    {
        Contact::create($request->validated());

        return to_route('admin.contacts.index')
            ->with('success', 'Contact created successfully.');
    }

    public function edit(Contact $contact): Response
    {
        $this->authorize('update', $contact);

        $c = $contact;

        return Inertia::render('admin/contacts/edit', [
            'contact' => [
                'id' => $c->id,
                'name' => $c->name,
                'email' => $c->email,
                'subject' => $c->subject,
                'message' => $c->message,
            ],
        ]);
    }

    public function update(UpdateContactRequest $request, Contact $contact): RedirectResponse
    {
        $contact->update($request->validated());

        return to_route('admin.contacts.index')
            ->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $this->authorize('delete', $contact);

        $contact->delete();

        return to_route('admin.contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}
