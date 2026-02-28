<?php

namespace App\Policies;

class ContactPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'contacts';
    }
}
