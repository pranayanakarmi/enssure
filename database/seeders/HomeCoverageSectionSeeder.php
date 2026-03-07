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
            'description' => 'The ENSSURE project is implemented in all seven provinces and 33 local governments, bringing federalised TVET services directly to communities. Our coverage map illustrates the broad and strategic reach of our Dual-VET and apprenticeship initiatives.',
        ]);

        $items = [
            ['value' => '308', 'label' => 'Planned Events', 'order' => 0],
            ['value' => '35', 'label' => 'Completed Events', 'order' => 1],
            ['value' => '5529', 'label' => 'Estimated Participants', 'order' => 2],
            ['value' => '1430', 'label' => 'Enrolled Participants', 'order' => 3],
            ['value' => '16.35M', 'label' => 'Budgeted Amount (in Nrs.)', 'order' => 4],
        ];

        foreach ($items as $item) {
            $section->items()->create($item);
        }
    }
}
