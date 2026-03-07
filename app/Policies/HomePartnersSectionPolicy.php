<?php

namespace App\Policies;

class HomePartnersSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_partners_sections';
    }
}
