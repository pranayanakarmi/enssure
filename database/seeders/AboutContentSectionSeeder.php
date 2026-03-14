<?php

namespace Database\Seeders;

use App\Models\AboutContentSection;
use Illuminate\Database\Seeder;

class AboutContentSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (AboutContentSection::count() > 0) {
            return;
        }

        AboutContentSection::create([
            'paragraph_1' => "The ENSSURE project is implemented by CTEVT at the federal level; Koshi Province, Madhesh Province, Bagmati Province, Gandaki Province, Lumbini Province, Karnali Province, Sudurpashchim Province and 33 Local Governments within those provinces. Helvetas Nepal provides Technical Assistance to all three tiers of the government and assures the quality of the programme.\n\nENSSURE will contribute to Nepal's ongoing TVET sector federalisation process. It will support the Provincial and Local Governments in the implementation of Dual-VET apprenticeships and training with on-the-job training, to better respond to employers' requirements and workers' aspirations.",
            'paragraph_2' => "The procurement and implementation of Dual-VET apprenticeships and training with OJT will be done through Province and Local government respectively with technical support from Helvetas Nepal. The project aims to institutionalise these TVET services so that Provincial and Local Governments can deliver on their TVET responsibilities systematically and sustainably beyond the project's lifespan.",
        ]);
    }
}
