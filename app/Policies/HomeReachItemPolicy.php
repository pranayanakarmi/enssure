<?php

namespace App\Policies;

class HomeReachItemPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_reach_items';
    }
}
