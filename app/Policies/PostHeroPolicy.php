<?php

namespace App\Policies;

class PostHeroPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'post_hero';
    }
}
