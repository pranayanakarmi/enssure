<?php

namespace App\Policies;

class PageHeroPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'page_hero';
    }
}
