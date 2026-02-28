<?php

namespace App\Policies;

class RedirectPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'redirects';
    }
}
