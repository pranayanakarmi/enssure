<?php

namespace App\Policies;

class PartnerPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'partners';
    }
}
