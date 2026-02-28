<?php

namespace App\Policies;

class DocumentPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'documents';
    }
}
