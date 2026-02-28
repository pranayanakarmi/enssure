<?php

namespace App\Policies;

class ImpactStoryPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'impact_stories';
    }
}
