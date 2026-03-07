<?php

namespace Database\Seeders;

use App\Models\HomeImpactStoriesSection;
use Illuminate\Database\Seeder;

class HomeImpactStoriesSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeImpactStoriesSection::count() > 0) {
            return;
        }

        HomeImpactStoriesSection::create([
            'badge_text' => 'Impact Stories',
            'title' => 'Transforming Skills, Changing Lives',
            'description' => 'See how practical apprenticeship training turns potential into progress. Each story highlights a journey of personal growth, showcasing the real-world benefits of a federalized and employer-responsive TVET system.',
            'cta_text' => 'View all stories',
            'cta_url' => '#',
        ]);
    }
}
