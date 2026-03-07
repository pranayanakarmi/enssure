<?php

namespace App\Policies;

class FooterSettingPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'footer_settings';
    }
}
