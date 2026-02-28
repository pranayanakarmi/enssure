<?php

namespace App\Policies;

class SettingPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'settings';
    }
}
