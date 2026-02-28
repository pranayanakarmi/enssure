<?php

namespace App\Policies;

class CommitteePolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'committees';
    }
}
