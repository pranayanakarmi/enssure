<?php

namespace App\Policies;

class HomeCoverageSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_coverage_sections';
    }
}
