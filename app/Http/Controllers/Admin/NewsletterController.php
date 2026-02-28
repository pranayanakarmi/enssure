<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreNewsletterRequest;
use App\Http\Requests\Admin\UpdateNewsletterRequest;
use App\Models\Newsletter;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class NewsletterController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Newsletter::class);

        $newsletters = Newsletter::orderBy('email')
            ->get()
            ->map(fn (Newsletter $n) => [
                'id' => $n->id,
                'email' => $n->email,
                'name' => $n->name,
                'is_active' => $n->is_active,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/newsletters/index', [
            'newsletters' => $newsletters,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Newsletter::class);

        return Inertia::render('admin/newsletters/create');
    }

    public function store(StoreNewsletterRequest $request): RedirectResponse
    {
        Newsletter::create($request->validated());

        return to_route('admin.newsletters.index')
            ->with('success', 'Newsletter subscriber created successfully.');
    }

    public function edit(Newsletter $newsletter): Response
    {
        $this->authorize('update', $newsletter);

        $n = $newsletter;

        return Inertia::render('admin/newsletters/edit', [
            'newsletter' => [
                'id' => $n->id,
                'email' => $n->email,
                'name' => $n->name,
                'is_active' => $n->is_active,
            ],
        ]);
    }

    public function update(UpdateNewsletterRequest $request, Newsletter $newsletter): RedirectResponse
    {
        $newsletter->update($request->validated());

        return to_route('admin.newsletters.index')
            ->with('success', 'Newsletter subscriber updated successfully.');
    }

    public function destroy(Newsletter $newsletter): RedirectResponse
    {
        $this->authorize('delete', $newsletter);

        $newsletter->delete();

        return to_route('admin.newsletters.index')
            ->with('success', 'Newsletter subscriber deleted successfully.');
    }
}
