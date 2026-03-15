<?php

namespace App\Policies;

class TeamPageContentPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'team_page_content';
    }
}
