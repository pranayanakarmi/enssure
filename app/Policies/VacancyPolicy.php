<?php

namespace App\Policies;

class VacancyPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'vacancies';
    }
}
