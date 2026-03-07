<?php

namespace App\Policies;

class HomeNewsSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_news_sections';
    }
}
