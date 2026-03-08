<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        if (Testimonial::count() > 0) {
            return;
        }

        $testimonials = [
            [
                'name' => 'Anita Shrestha',
                'designation' => 'Former Apprentice, Now Workshop Owner',
                'organization' => null,
                'testimonial_text' => '"The Dual-VET apprenticeship didn\'t just teach me welding—it gave me a certified skill and the confidence to start my own business. I\'m now employing three others from my community, something I never imagined possible."',
                'is_published' => true,
                'order' => 1,
            ],
            [
                'name' => 'Anita Shrestha',
                'designation' => 'Former Apprentice, Now Workshop Owner',
                'organization' => null,
                'testimonial_text' => '"The Dual-VET apprenticeship didn\'t just teach me welding—it gave me a certified skill and the confidence to start my own business. I\'m now employing three others from my community, something I never imagined possible."',
                'is_published' => true,
                'order' => 2,
            ],
            [
                'name' => 'Ram Kumar',
                'designation' => 'Industrial Technician',
                'organization' => null,
                'testimonial_text' => '"ENSSURE\'s training transformed my career. The hands-on approach and industry partnership gave me skills that employers actually value."',
                'is_published' => true,
                'order' => 3,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
