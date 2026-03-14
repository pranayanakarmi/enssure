<?php

namespace App\Policies;

class ImpactPageHeroPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'impact_page_hero';
    }
}
