<?php

namespace Database\Seeders;

use App\Models\HomeNewsSection;
use Illuminate\Database\Seeder;

class HomeNewsSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeNewsSection::count() > 0) {
            return;
        }

        $section = HomeNewsSection::create([
            'badge_text' => 'Updates',
            'title' => 'Latest News and Articles',
            'description' => 'Keeping you informed on the latest developments and insights from the world of skills and employment in Nepal. Our articles dive into trends, success stories, and analysis of the evolving TVET sector.',
            'cta_text' => 'View all News',
            'cta_url' => '#',
        ]);

        $items = [
            ['title' => 'CSOs role to amendment of National Park and Wildlife', 'link_url' => '#', 'order' => 0],
            ['title' => 'Policy Discussion with federal level parliament members to facilitate ..', 'link_url' => '#', 'order' => 1],
            ['title' => 'High Level Policy Discussion on Right to Food and Food Sovereignty Issues', 'link_url' => '#', 'order' => 2],
        ];

        foreach ($items as $item) {
            $section->items()->create($item);
        }
    }
}
