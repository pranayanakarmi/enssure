<?php

namespace App\Policies;

class TagPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'tags';
    }
}
