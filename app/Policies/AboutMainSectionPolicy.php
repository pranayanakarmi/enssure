<?php

namespace App\Policies;

class AboutMainSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'about_main_sections';
    }
}
