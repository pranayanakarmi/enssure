<?php

namespace App\Policies;

class TeamMemberPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'team_members';
    }
}
