<?php

namespace App\Policies;

class HomeAboutSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_about_sections';
    }
}
