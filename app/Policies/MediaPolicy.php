<?php

namespace App\Policies;

class MediaPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'media';
    }
}
