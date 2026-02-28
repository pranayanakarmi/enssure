<?php

namespace App\Policies;

class ApplicationFormPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'application_forms';
    }
}
