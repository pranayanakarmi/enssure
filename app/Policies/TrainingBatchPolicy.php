<?php

namespace App\Policies;

class TrainingBatchPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'training_batches';
    }
}
