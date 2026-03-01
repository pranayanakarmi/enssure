<?php

namespace App\Policies;

class HomeReachSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_reach_sections';
    }
}
