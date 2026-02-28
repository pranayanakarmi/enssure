<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCommitteeRequest;
use App\Http\Requests\Admin\UpdateCommitteeRequest;
use App\Models\Committee;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CommitteeController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Committee::class);

        $committees = Committee::orderBy('name')
            ->get()
            ->map(fn (Committee $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'committee_type' => $c->committee_type,
                'formation_date' => $c->formation_date?->toDateString(),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/committees/index', [
            'committees' => $committees,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Committee::class);

        return Inertia::render('admin/committees/create');
    }

    public function store(StoreCommitteeRequest $request): RedirectResponse
    {
        Committee::create($request->validated());

        return to_route('admin.committees.index')
            ->with('success', 'Committee created successfully.');
    }

    public function edit(Committee $committee): Response
    {
        $this->authorize('update', $committee);

        $committee->load(['members' => fn ($q) => $q->orderBy('order')]);
        $c = $committee;

        return Inertia::render('admin/committees/edit', [
            'committee' => [
                'id' => $c->id,
                'name' => $c->name,
                'committee_type' => $c->committee_type,
                'description' => $c->description,
                'formation_date' => $c->formation_date?->toDateString(),
                'members' => $c->members->map(fn ($m) => [
                    'id' => $m->id,
                    'name' => $m->name,
                    'position' => $m->position,
                    'order' => $m->order,
                ])->values()->all(),
            ],
        ]);
    }

    public function update(UpdateCommitteeRequest $request, Committee $committee): RedirectResponse
    {
        $committee->update($request->validated());

        return to_route('admin.committees.index')
            ->with('success', 'Committee updated successfully.');
    }

    public function destroy(Committee $committee): RedirectResponse
    {
        $this->authorize('delete', $committee);

        $committee->delete();

        return to_route('admin.committees.index')
            ->with('success', 'Committee deleted successfully.');
    }
}
