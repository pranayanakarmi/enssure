<?php

namespace App\Policies;

class FeedbackPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'feedback';
    }
}
