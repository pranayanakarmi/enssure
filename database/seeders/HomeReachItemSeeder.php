<?php

namespace Database\Seeders;

use App\Models\HomeReachSection;
use Illuminate\Database\Seeder;

class HomeReachItemSeeder extends Seeder
{
    public function run(): void
    {
        $section = HomeReachSection::first();
        if (! $section || $section->items()->count() > 0) {
            return;
        }

        $items = [
            ['value' => '2500', 'suffix' => '+', 'label' => 'Apprenticeship', 'order' => 0],
            ['value' => '65', 'suffix' => '%', 'label' => 'Impact on Career Choice', 'order' => 1],
            ['value' => '4,687', 'suffix' => '+', 'label' => 'Workers trained', 'order' => 2],
            ['value' => '4420', 'suffix' => '+', 'label' => 'Training with OTJ', 'order' => 3],
        ];

        foreach ($items as $item) {
            $section->items()->create($item);
        }
    }
}
