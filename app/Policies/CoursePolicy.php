<?php

namespace App\Policies;

class CoursePolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'courses';
    }
}
