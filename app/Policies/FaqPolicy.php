<?php

namespace App\Policies;

class FaqPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'faqs';
    }
}
