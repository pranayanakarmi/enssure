<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    public function run(): void
    {
        if (Partner::count() > 0) {
            return;
        }

        $partners = [
            ['name' => 'Minerva Foods', 'order' => 1],
            ['name' => 'Test', 'order' => 2],
            ['name' => 'Bird', 'order' => 3],
            ['name' => 'Green Works', 'order' => 4],
        ];

        foreach ($partners as $partner) {
            Partner::create($partner);
        }
    }
}
