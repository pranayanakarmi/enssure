<?php

namespace App\Policies;

class CommitteeMemberPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'committee_members';
    }
}
