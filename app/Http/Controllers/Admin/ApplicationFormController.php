<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreApplicationFormRequest;
use App\Http\Requests\Admin\UpdateApplicationFormRequest;
use App\Models\ApplicationForm;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationFormController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', ApplicationForm::class);

        $applicationForms = ApplicationForm::orderByDesc('id')
            ->get()
            ->map(fn (ApplicationForm $a) => [
                'id' => $a->id,
                'applicant_name' => $a->applicant_name,
                'email' => $a->email,
                'phone' => $a->phone,
                'course_interest' => $a->course_interest,
                'status' => $a->status,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/application-forms/index', [
            'applicationForms' => $applicationForms,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', ApplicationForm::class);

        return Inertia::render('admin/application-forms/create');
    }

    public function store(StoreApplicationFormRequest $request): RedirectResponse
    {
        ApplicationForm::create($request->validated());

        return to_route('admin.application_forms.index')
            ->with('success', 'Application form created successfully.');
    }

    public function edit(ApplicationForm $application_form): Response
    {
        $this->authorize('update', $application_form);

        $a = $application_form;

        return Inertia::render('admin/application-forms/edit', [
            'applicationForm' => [
                'id' => $a->id,
                'applicant_name' => $a->applicant_name,
                'email' => $a->email,
                'phone' => $a->phone,
                'address' => $a->address,
                'course_interest' => $a->course_interest,
                'status' => $a->status,
                'notes' => $a->notes,
            ],
        ]);
    }

    public function update(UpdateApplicationFormRequest $request, ApplicationForm $application_form): RedirectResponse
    {
        $application_form->update($request->validated());

        return to_route('admin.application_forms.index')
            ->with('success', 'Application form updated successfully.');
    }

    public function destroy(ApplicationForm $application_form): RedirectResponse
    {
        $this->authorize('delete', $application_form);

        $application_form->delete();

        return to_route('admin.application_forms.index')
            ->with('success', 'Application form deleted successfully.');
    }
}
