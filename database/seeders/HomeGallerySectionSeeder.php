<?php

namespace Database\Seeders;

use App\Models\HomeGallerySection;
use Illuminate\Database\Seeder;

class HomeGallerySectionSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeGallerySection::count() > 0) {
            return;
        }

        HomeGallerySection::create([
            'badge_text' => 'Gallery',
            'title' => 'The ENSSURE Journey in Pictures',
            'description' => 'This section provides a visual record of our activities and outcomes. See the faces, places, and practical work that define the federalised TVET system we support.',
            'cta_text' => 'View all gallery',
            'cta_url' => '#',
        ]);
    }
}
