<?php

namespace App\Policies;

class NewsletterPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'newsletters';
    }
}
