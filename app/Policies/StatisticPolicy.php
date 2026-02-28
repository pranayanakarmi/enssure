<?php

namespace App\Policies;

class StatisticPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'statistics';
    }
}
