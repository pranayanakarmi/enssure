<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublicContactFeedbackRequest;
use App\Models\ContactFeedbackContent;
use App\Models\SiteSetting;
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


        $siteSetting = SiteSetting::first();

        $social_links = [];
        if (!empty($siteSetting?->facebook_url)) {
            $social_links[] = [ 'platform' => 'facebook', 'url' => $siteSetting->facebook_url ];
        }
        if (!empty($siteSetting?->x_url)) {
            $social_links[] = [ 'platform' => 'x', 'url' => $siteSetting->x_url ];
        }
        if (!empty($siteSetting?->youtube_url)) {
            $social_links[] = [ 'platform' => 'youtube', 'url' => $siteSetting->youtube_url ];
        }

        $contactInfo = [
            'address' => $siteSetting->visit_us ?? 'ENSSURE Provincial Office, Hetauda, Nepal',
            'phone' => $siteSetting->header_phone_1 ?? '',
            'email' => $siteSetting->header_email ?? '',
            'hours' => $siteSetting->working_hours ?? 'Mon - Fri: 9:00 AM – 5:00 PM',
            'social_links' => $social_links,
        ];

        return Inertia::render('Contact', [
            'contactFeedbackContent' => [
                'title' => $content->title,
                'description' => $content->description,
            ],
            'contactInfo' => $contactInfo,
            'provinceContacts' => $siteSetting?->province_contacts ?? [],
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
