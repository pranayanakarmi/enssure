<?php

namespace App\Policies;

class BeneficiaryPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'beneficiaries';
    }
}
