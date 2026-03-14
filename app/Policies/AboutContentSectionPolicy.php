<?php

namespace App\Policies;

class AboutContentSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'about_content_sections';
    }
}
