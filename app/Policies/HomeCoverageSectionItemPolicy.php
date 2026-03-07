<?php

namespace App\Policies;

class HomeCoverageSectionItemPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_coverage_section_items';
    }
}
