<?php

namespace App\Policies;

class CategoryPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'categories';
    }
}
