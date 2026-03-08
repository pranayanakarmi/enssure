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
            ['value' => '2500', 'suffix' => '+', 'label' => 'Apprenticeship', 'link_url' => '/home', 'order' => 1],
            ['value' => '65', 'suffix' => '%', 'label' => 'Impact on Career Choice', 'link_url' => '/home', 'order' => 2],
            ['value' => '4687', 'suffix' => '+', 'label' => 'Workers Trained', 'link_url' => '/home', 'order' => 3],
            ['value' => '4420', 'suffix' => '+', 'label' => 'Training with OTJ', 'link_url' => '/training-with-ojt', 'order' => 4],
        ];

        foreach ($items as $item) {
            $section->items()->create($item);
        }
    }
}
