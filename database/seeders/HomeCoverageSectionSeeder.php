<?php

namespace Database\Seeders;

use App\Models\HomeCoverageSection;
use Illuminate\Database\Seeder;

class HomeCoverageSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeCoverageSection::count() > 0) {
            return;
        }

        $section = HomeCoverageSection::create([
            'badge_text' => 'Coverage',
            'title' => 'Reaching Across the Nation',
            'description' => '<p>The ENSSURE project is implemented in all seven provinces and 33 local governments, bringing federalised TVET services directly to communities. Our coverage map illustrates the broad and strategic reach of our Dual-VET and apprenticeship initiatives.</p>',
        ]);

        $items = [
            ['value' => '310', 'label' => 'Planned Events', 'order' => 1],
            ['value' => '36', 'label' => 'Completed Events', 'order' => 2],
            ['value' => '5530', 'label' => 'Estimated Participants', 'order' => 3],
            ['value' => '1430', 'label' => 'Enrolled Participants', 'order' => 4],
            ['value' => '16.35M', 'label' => 'Budgeted Amount (in Nrs.)', 'order' => 5],
        ];

        foreach ($items as $item) {
            $section->items()->create($item);
        }
    }
}
