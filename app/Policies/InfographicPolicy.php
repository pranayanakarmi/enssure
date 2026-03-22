<?php

namespace App\Policies;

class InfographicPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'infographics';
    }
}
