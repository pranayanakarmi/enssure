<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreVacancyRequest;
use App\Http\Requests\Admin\UpdateVacancyRequest;
use App\Models\Vacancy;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VacancyController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Vacancy::class);

        $vacancies = Vacancy::orderByDesc('published_at')
            ->get()
            ->map(fn (Vacancy $v) => [
                'id' => $v->id,
                'position_title' => $v->position_title,
                'slug' => $v->slug,
                'location' => $v->location,
                'job_type' => $v->job_type,
                'status' => $v->status,
                'application_deadline' => $v->application_deadline?->toDateString(),
                'published_at' => $v->published_at?->toISOString(),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/vacancies/index', [
            'vacancies' => $vacancies,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Vacancy::class);

        return Inertia::render('admin/vacancies/create');
    }

    public function store(StoreVacancyRequest $request): RedirectResponse
    {
        Vacancy::create($request->validated());

        return to_route('admin.vacancies.index')
            ->with('success', 'Vacancy created successfully.');
    }

    public function edit(Vacancy $vacancy): Response
    {
        $this->authorize('update', $vacancy);

        return Inertia::render('admin/vacancies/edit', [
            'vacancy' => [
                'id' => $vacancy->id,
                'position_title' => $vacancy->position_title,
                'slug' => $vacancy->slug,
                'job_description' => $vacancy->job_description,
                'requirements' => $vacancy->requirements,
                'location' => $vacancy->location,
                'job_type' => $vacancy->job_type,
                'number_of_positions' => $vacancy->number_of_positions,
                'application_deadline' => $vacancy->application_deadline?->toDateString(),
                'application_instructions' => $vacancy->application_instructions,
                'tor_file' => $vacancy->tor_file,
                'status' => $vacancy->status,
                'published_at' => $vacancy->published_at?->toISOString(),
            ],
        ]);
    }

    public function update(UpdateVacancyRequest $request, Vacancy $vacancy): RedirectResponse
    {
        $vacancy->update($request->validated());

        return to_route('admin.vacancies.index')
            ->with('success', 'Vacancy updated successfully.');
    }

    public function destroy(Vacancy $vacancy): RedirectResponse
    {
        $this->authorize('delete', $vacancy);

        $vacancy->delete();

        return to_route('admin.vacancies.index')
            ->with('success', 'Vacancy deleted successfully.');
    }
}
