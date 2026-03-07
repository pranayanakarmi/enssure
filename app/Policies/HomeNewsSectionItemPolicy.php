<?php

namespace App\Policies;

class HomeNewsSectionItemPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_news_section_items';
    }
}
