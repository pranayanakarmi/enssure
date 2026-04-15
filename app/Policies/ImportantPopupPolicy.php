<?php

namespace App\Policies;

class ImportantPopupPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'important_popups';
    }
}
