<?php

namespace Database\Seeders;

use App\Models\HomeSupportSection;
use Illuminate\Database\Seeder;

class HomeSupportSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeSupportSection::count() > 0) {
            return;
        }

        HomeSupportSection::create([
            'badge_text' => 'Support',
            'title' => 'Technical Assistance By',
        ]);
    }
}
