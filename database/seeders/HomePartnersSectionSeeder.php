<?php

namespace Database\Seeders;

use App\Models\HomePartnersSection;
use Illuminate\Database\Seeder;

class HomePartnersSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (HomePartnersSection::count() > 0) {
            return;
        }

        HomePartnersSection::create([
            'badge_text' => 'Our Partners',
            'title' => 'We work with the best Partners',
        ]);
    }
}
