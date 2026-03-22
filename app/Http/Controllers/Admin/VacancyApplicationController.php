<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VacancyApplication;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class VacancyApplicationController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', VacancyApplication::class);

        $applications = VacancyApplication::query()
            ->with('vacancy:id,position_title,slug')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (VacancyApplication $a) => [
                'id' => $a->id,
                'vacancy_title' => $a->vacancy?->position_title,
                'vacancy_slug' => $a->vacancy?->slug,
                'name' => $a->name,
                'email' => $a->email,
                'phone' => $a->phone,
                'submitted_at' => $a->created_at->toIso8601String(),
                'has_cover_letter' => $a->cover_letter !== null && $a->cover_letter !== '',
            ])
            ->values()
            ->all();

        return Inertia::render('admin/vacancy-applications/index', [
            'applications' => $applications,
        ]);
    }

    public function show(VacancyApplication $vacancy_application): Response
    {
        $this->authorize('view', $vacancy_application);

        $vacancy_application->load('vacancy:id,position_title,slug');

        return Inertia::render('admin/vacancy-applications/show', [
            'application' => [
                'id' => $vacancy_application->id,
                'name' => $vacancy_application->name,
                'email' => $vacancy_application->email,
                'phone' => $vacancy_application->phone,
                'cover_letter' => $vacancy_application->cover_letter,
                'resume_url' => Storage::disk('public')->url($vacancy_application->resume_path),
                'submitted_at' => $vacancy_application->created_at->toIso8601String(),
                'vacancy' => $vacancy_application->vacancy
                    ? [
                        'title' => $vacancy_application->vacancy->position_title,
                        'slug' => $vacancy_application->vacancy->slug,
                    ]
                    : null,
            ],
        ]);
    }

    public function destroy(VacancyApplication $vacancy_application): RedirectResponse
    {
        $this->authorize('delete', $vacancy_application);

        if ($vacancy_application->resume_path) {
            Storage::disk('public')->delete($vacancy_application->resume_path);
        }

        $vacancy_application->delete();

        return to_route('admin.vacancy_applications.index')
            ->with('success', 'Application deleted successfully.');
    }
}
