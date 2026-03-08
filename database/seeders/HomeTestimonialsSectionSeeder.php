<?php

namespace Database\Seeders;

use App\Models\HomeTestimonialsSection;
use Illuminate\Database\Seeder;

class HomeTestimonialsSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeTestimonialsSection::count() > 0) {
            return;
        }

        HomeTestimonialsSection::create([
            'badge_text' => 'Testimonials',
            'title' => 'Direct testimonials that showcase the real, on-the-ground impact of the ENSSURE project on people and the skills sector in Nepal...',
        ]);
    }
}
