<?php

namespace Database\Seeders;

use App\Models\ImpactPageHero;
use Illuminate\Database\Seeder;

class ImpactPageHeroSeeder extends Seeder
{
    public function run(): void
    {
        if (ImpactPageHero::count() > 0) {
            return;
        }

        ImpactPageHero::create([
            'title' => 'Impact Stories',
            'hero_image' => null,
        ]);
    }
}
