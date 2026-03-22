<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVacancyApplicationRequest;
use App\Models\Vacancy;
use App\Models\VacancyApplication;
use Illuminate\Http\RedirectResponse;

class VacancyApplicationController extends Controller
{
    public function store(StoreVacancyApplicationRequest $request, Vacancy $vacancy): RedirectResponse
    {
        if (! Vacancy::query()->publishedForPublic()->whereKey($vacancy->id)->exists()) {
            abort(404);
        }

        $path = $request->file('resume')->store("vacancy-applications/{$vacancy->id}", 'public');

        VacancyApplication::create([
            'vacancy_id' => $vacancy->id,
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'phone' => $request->validated('phone'),
            'cover_letter' => $request->validated('cover_letter'),
            'resume_path' => $path,
        ]);

        return back()->with('success', 'Your application has been submitted successfully.');
    }
}
