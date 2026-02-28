<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEmailTemplateRequest;
use App\Http\Requests\Admin\UpdateEmailTemplateRequest;
use App\Models\EmailTemplate;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EmailTemplateController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', EmailTemplate::class);

        $emailTemplates = EmailTemplate::orderBy('name')
            ->get()
            ->map(fn (EmailTemplate $e) => [
                'id' => $e->id,
                'name' => $e->name,
                'slug' => $e->slug,
                'subject' => $e->subject,
                'is_active' => $e->is_active,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/email-templates/index', [
            'emailTemplates' => $emailTemplates,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', EmailTemplate::class);

        return Inertia::render('admin/email-templates/create');
    }

    public function store(StoreEmailTemplateRequest $request): RedirectResponse
    {
        EmailTemplate::create($request->validated());

        return to_route('admin.email_templates.index')
            ->with('success', 'Email template created successfully.');
    }

    public function edit(EmailTemplate $email_template): Response
    {
        $this->authorize('update', $email_template);

        $e = $email_template;

        return Inertia::render('admin/email-templates/edit', [
            'emailTemplate' => [
                'id' => $e->id,
                'name' => $e->name,
                'slug' => $e->slug,
                'subject' => $e->subject,
                'body' => $e->body,
                'variables' => $e->variables,
                'description' => $e->description,
                'is_active' => $e->is_active,
            ],
        ]);
    }

    public function update(UpdateEmailTemplateRequest $request, EmailTemplate $email_template): RedirectResponse
    {
        $email_template->update($request->validated());

        return to_route('admin.email_templates.index')
            ->with('success', 'Email template updated successfully.');
    }

    public function destroy(EmailTemplate $email_template): RedirectResponse
    {
        $this->authorize('delete', $email_template);

        $email_template->delete();

        return to_route('admin.email_templates.index')
            ->with('success', 'Email template deleted successfully.');
    }
}
