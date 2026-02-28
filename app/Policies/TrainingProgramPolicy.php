<?php

namespace App\Policies;

class TrainingProgramPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'training_programs';
    }
}
