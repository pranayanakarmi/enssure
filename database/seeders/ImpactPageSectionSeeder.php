<?php

namespace Database\Seeders;

use App\Models\ImpactPageSection;
use Illuminate\Database\Seeder;

class ImpactPageSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (ImpactPageSection::count() > 0) {
            return;
        }

        ImpactPageSection::create([
            'title' => 'Transforming Skills, Changing Lives',
            'description' => 'See how practical apprenticeship training turns potential into progress. Each story highlights a journey of personal growth, showcasing the real-world benefits of a federalized and employer-responsive TVET system.',
        ]);
    }
}
