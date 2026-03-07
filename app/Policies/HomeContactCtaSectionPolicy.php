<?php

namespace App\Policies;

class HomeContactCtaSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_contact_cta_sections';
    }
}
