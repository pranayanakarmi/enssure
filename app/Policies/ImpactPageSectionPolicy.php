<?php

namespace App\Policies;

class ImpactPageSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'impact_page_sections';
    }
}
