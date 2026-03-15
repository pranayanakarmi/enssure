<?php

namespace Database\Seeders;

use App\Models\GalleryPageSection;
use Illuminate\Database\Seeder;

class GalleryPageSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (GalleryPageSection::count() > 0) {
            return;
        }

        GalleryPageSection::create([
            'title' => 'The ENSSURE Journey in Pictures',
            'description' => 'This section provides a visual record of our activities and outcomes. See the faces, places, and practical work that define the federalised TVET system we support.',
        ]);
    }
}
