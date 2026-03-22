<?php

namespace App\Policies;

class InfographicsPageContentPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'infographics_page_content';
    }
}
