<?php

namespace App\Policies;

class SliderItemPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'slider_items';
    }
}
