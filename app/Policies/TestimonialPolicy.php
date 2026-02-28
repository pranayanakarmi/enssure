<?php

namespace App\Policies;

class TestimonialPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'testimonials';
    }
}
