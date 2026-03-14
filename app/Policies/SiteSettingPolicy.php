<?php

namespace App\Policies;

class SiteSettingPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'site_settings';
    }
}
