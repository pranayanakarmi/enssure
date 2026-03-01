<?php

namespace Database\Seeders;

use App\Models\HomeAboutSection;
use Illuminate\Database\Seeder;

class HomeAboutSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeAboutSection::count() > 0) {
            return;
        }

        HomeAboutSection::create([
            'badge_text' => 'About us',
            'title' => 'Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE)',
            'body' => '<p>Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE) project is a <strong>bilateral project of the Government of Nepal</strong> (GoN) and the Government of Switzerland. The first phase of the project, which started on 20 January 2016 is concluding on 15 July 2022. The second phase of the project is concurrently being implemented from 10 September 2021 and it will be implemented till 15 July 2025.</p>',
            'card_title' => 'Skill Upgrading Training for Workers',
            'cta_text' => 'Explore more',
            'cta_url' => '#',
        ]);
    }
}
