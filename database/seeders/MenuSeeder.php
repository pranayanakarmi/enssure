<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        if (Menu::where('is_main_header_menu', true)->exists()) {
            return;
        }

        $menu = Menu::create([
            'name' => 'Main Header',
            'is_published' => true,
            'is_main_header_menu' => true,
        ]);

        $items = [
            ['title' => 'Home', 'url' => '/', 'order' => 1],
            ['title' => 'About', 'url' => '/about', 'order' => 2],
            ['title' => 'Impact Stories', 'url' => '/impact-stories', 'order' => 3],
            ['title' => 'Gallery', 'url' => '/gallery', 'order' => 4],
            ['title' => 'Team', 'url' => '/team', 'order' => 5],
            ['title' => 'Vacancy', 'url' => '/vacancy', 'order' => 6],
            ['title' => 'Contact', 'url' => '/contact', 'order' => 7],
        ];

        foreach ($items as $item) {
            $menu->allItems()->create(array_merge($item, ['target' => '_self']));
        }
    }
}
