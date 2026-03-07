<?php

namespace App\Policies;

class HomeImpactStoriesSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_impact_stories_sections';
    }
}
