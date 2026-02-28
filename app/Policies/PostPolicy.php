<?php

namespace App\Policies;

class PostPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'posts';
    }
}
