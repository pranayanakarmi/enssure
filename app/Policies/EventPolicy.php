<?php

namespace App\Policies;

class EventPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'events';
    }
}
