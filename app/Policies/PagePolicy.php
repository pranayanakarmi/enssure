<?php

namespace App\Policies;

class PagePolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'pages';
    }
}
