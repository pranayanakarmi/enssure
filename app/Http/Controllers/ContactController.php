<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublicContactFeedbackRequest;
use App\Models\ContactFeedbackContent;
use App\Models\Feedback;
use App\Models\PublicContactFeedbackSource;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    private const DEFAULT_TITLE = 'Please register your feedback/complaint';

    private const DEFAULT_DESCRIPTION = 'If you have any questions, feedback or complaints about the quality of our programs, are aware of any irregularities, or would like to report about behaviour of staff, please notify us by completing the form below. All submissions will be kept confidential.';

    public function show(): Response
    {
        $content = ContactFeedbackContent::first();
        if (! $content) {
            $content = ContactFeedbackContent::create([
                'title' => self::DEFAULT_TITLE,
                'description' => self::DEFAULT_DESCRIPTION,
            ]);
        }

        return Inertia::render('Contact', [
            'contactFeedbackContent' => [
                'title' => $content->title,
                'description' => $content->description,
            ],
        ]);
    }

    public function store(StorePublicContactFeedbackRequest $request): RedirectResponse
    {
        $data = $request->validated();

        Feedback::create([
            'feedback_type' => $data['type'],
            'feedbackable_type' => PublicContactFeedbackSource::class,
            'feedbackable_id' => 1,
            'name' => $data['name'] ?? null,
            'email' => $data['email'],
            'feedback_text' => $data['feedback_text'],
            'is_public' => false,
        ]);

        return back()->with('success', 'Thank you. Your message has been received.');
    }
}
