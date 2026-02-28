<?php

namespace App\Policies;

class TranslationPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'translations';
    }
}
