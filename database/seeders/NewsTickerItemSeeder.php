<?php

namespace Database\Seeders;

use App\Models\NewsTickerItem;
use Illuminate\Database\Seeder;

class NewsTickerItemSeeder extends Seeder
{
    public function run(): void
    {
        if (NewsTickerItem::count() > 0) {
            return;
        }

        $items = [
            ['title' => 'Lighting the village and his life', 'url' => null, 'order' => 1, 'is_published' => true],
            ['title' => 'Story of guardianless chef', 'url' => null, 'order' => 2, 'is_published' => true],
            ['title' => 'Good things come to those who learns skills', 'url' => null, 'order' => 3, 'is_published' => true],
            ['title' => 'Lessons on hard work and determination from', 'url' => null, 'order' => 4, 'is_published' => true],
        ];

        foreach ($items as $item) {
            NewsTickerItem::create($item);
        }
    }
}
