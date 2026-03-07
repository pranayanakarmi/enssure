<?php

namespace App\Policies;

class HomeSupportSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_support_sections';
    }
}
