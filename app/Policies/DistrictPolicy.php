<?php

namespace App\Policies;

class DistrictPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'districts';
    }
}
