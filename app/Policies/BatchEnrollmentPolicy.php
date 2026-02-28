<?php

namespace App\Policies;

class BatchEnrollmentPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'batch_enrollments';
    }
}
