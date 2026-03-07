<?php

namespace App\Policies;

class HomeTestimonialsSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_testimonials_sections';
    }
}
