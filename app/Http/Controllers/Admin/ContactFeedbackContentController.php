<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateContactFeedbackContentRequest;
use App\Models\ContactFeedbackContent;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactFeedbackContentController extends Controller
{
    public function edit(): Response
    {
        $content = ContactFeedbackContent::first()
            ?? ContactFeedbackContent::create([
                'title' => 'Please register your feedback/complaint',
                'description' => 'If you have any questions, feedback or complaints about the quality of our programs, are aware of any irregularities, or would like to report about behaviour of staff, please notify us by completing the form below. All submissions will be kept confidential.',
            ]);

        $this->authorize('update', $content);

        return Inertia::render('admin/contact_feedback/content_edit', [
            'contactFeedbackContent' => [
                'id' => $content->id,
                'title' => $content->title,
                'description' => $content->description,
            ],
        ]);
    }

    public function update(UpdateContactFeedbackContentRequest $request): RedirectResponse
    {
        $content = ContactFeedbackContent::first();

        if (! $content) {
            $content = ContactFeedbackContent::create($request->validated());
            $this->authorize('update', $content);

            return back()->with('success', 'Contact feedback section created successfully.');
        }

        $this->authorize('update', $content);
        $content->update($request->validated());

        return back()->with('success', 'Contact feedback section updated successfully.');
    }
}
