<?php

namespace Database\Seeders;

use App\Models\AboutPageHero;
use Illuminate\Database\Seeder;

class AboutPageHeroSeeder extends Seeder
{
    public function run(): void
    {
        if (AboutPageHero::count() > 0) {
            return;
        }

        AboutPageHero::create([
            'title' => 'About Us',
            'hero_image' => null,
        ]);
    }
}
