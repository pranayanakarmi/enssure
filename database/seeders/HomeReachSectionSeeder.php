<?php

namespace Database\Seeders;

use App\Models\HomeReachSection;
use Illuminate\Database\Seeder;

class HomeReachSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeReachSection::count() > 0) {
            return;
        }

        HomeReachSection::create([
            'badge_text' => 'Our Reach',
            'title' => 'Our Impact & Milestones',
            'description' => '<p>From the initial spark of a career choice to the final certification of trained professionals, our milestones represent a commitment to technical excellence and workforce diversity. By integrating hands-on apprenticeship with rigorous on-the-job training, we have successfully bridged the skills gap and placed expert-ready technicians into the modern industrial sector.</p>',
        ]);
    }
}
