<?php

namespace App\Policies;

class AboutPageHeroPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'about_page_hero';
    }
}
