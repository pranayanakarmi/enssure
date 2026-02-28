<?php

namespace App\Policies;

class EmailTemplatePolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'email_templates';
    }
}
