<?php

namespace App\Policies;

class FooterColumnPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'footer_columns';
    }
}
