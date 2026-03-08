<?php

namespace Database\Seeders;

use App\Models\HomeGallerySection;
use Illuminate\Database\Seeder;

class HomeGallerySectionItemSeeder extends Seeder
{
    public function run(): void
    {
        $section = HomeGallerySection::first();
        if (! $section || $section->items()->count() > 0) {
            return;
        }

        $items = [
            ['text' => 'This section provides a visual record of our activities and outcomes.', 'order' => 1],
            ['text' => 'Empowering communities through sustainable initiatives.', 'order' => 2],
            ['text' => 'Capacity development programs across regions.', 'order' => 3],
            ['text' => 'Collaborative workshops and engagement sessions.', 'order' => 4],
            ['text' => 'Documenting project milestones and achievements.', 'order' => 5],
            ['text' => 'Strengthening partnerships for long-term impact.', 'order' => 6],
        ];

        foreach ($items as $item) {
            $section->items()->create($item);
        }
    }
}
