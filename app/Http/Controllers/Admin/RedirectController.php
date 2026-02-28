<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRedirectRequest;
use App\Http\Requests\Admin\UpdateRedirectRequest;
use App\Models\Redirect;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RedirectController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Redirect::class);

        $redirects = Redirect::orderBy('old_url')
            ->get()
            ->map(fn (Redirect $r) => [
                'id' => $r->id,
                'old_url' => $r->old_url,
                'new_url' => $r->new_url,
                'status_code' => $r->status_code,
                'hit_count' => $r->hit_count,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/redirects/index', [
            'redirects' => $redirects,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Redirect::class);

        return Inertia::render('admin/redirects/create');
    }

    public function store(StoreRedirectRequest $request): RedirectResponse
    {
        Redirect::create($request->validated());

        return to_route('admin.redirects.index')
            ->with('success', 'Redirect created successfully.');
    }

    public function edit(Redirect $redirect): Response
    {
        $this->authorize('update', $redirect);

        $r = $redirect;

        return Inertia::render('admin/redirects/edit', [
            'redirect' => [
                'id' => $r->id,
                'old_url' => $r->old_url,
                'new_url' => $r->new_url,
                'status_code' => $r->status_code,
            ],
        ]);
    }

    public function update(UpdateRedirectRequest $request, Redirect $redirect): RedirectResponse
    {
        $redirect->update($request->validated());

        return to_route('admin.redirects.index')
            ->with('success', 'Redirect updated successfully.');
    }

    public function destroy(Redirect $redirect): RedirectResponse
    {
        $this->authorize('delete', $redirect);

        $redirect->delete();

        return to_route('admin.redirects.index')
            ->with('success', 'Redirect deleted successfully.');
    }
}
