<?php

namespace App\Policies;

class SliderPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'sliders';
    }
}
