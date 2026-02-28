<?php

namespace App\Policies;

class NoticePolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'notices';
    }
}
