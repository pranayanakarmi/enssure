<?php

namespace App\Policies;

class VacancyApplicationPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'vacancy_applications';
    }
}
