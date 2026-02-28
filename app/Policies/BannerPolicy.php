<?php

namespace App\Policies;

class BannerPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'banners';
    }
}
