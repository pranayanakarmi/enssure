<?php

namespace App\Policies;

class PublicationPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'publications';
    }
}
