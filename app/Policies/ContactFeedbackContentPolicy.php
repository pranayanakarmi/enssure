<?php

namespace App\Policies;

class ContactFeedbackContentPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'contact_feedback_content';
    }
}
