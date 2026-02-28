<?php

namespace App\Policies;

class MenuPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'menus';
    }
}
