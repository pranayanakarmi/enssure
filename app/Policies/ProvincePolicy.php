<?php

namespace App\Policies;

class ProvincePolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'provinces';
    }
}
