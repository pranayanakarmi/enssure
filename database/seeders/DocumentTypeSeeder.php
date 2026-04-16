<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DocumentType;

class DocumentTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'Courses', 'slug' => 'courses'],
            ['name' => 'Documents', 'slug' => 'documents'],
            ['name' => 'Form', 'slug' => 'form'],
            ['name' => 'Guidelines', 'slug' => 'guidelines'],
            ['name' => 'Report', 'slug' => 'report'],
        ];

        foreach ($types as $type) {
            DocumentType::firstOrCreate(['slug' => $type['slug']], $type);
        }
    }
}
