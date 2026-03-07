<?php

namespace Database\Seeders;

use App\Models\FooterColumn;
use App\Models\FooterSetting;
use Illuminate\Database\Seeder;

class FooterSeeder extends Seeder
{
    public function run(): void
    {
        if (FooterColumn::exists()) {
            return;
        }

        $company = FooterColumn::create(['title' => 'Company', 'order' => 0]);
        foreach ([['About Us', '#about'], ['Contact us', '#contact'], ['Impact Stories', '#stories'], ['Coverage', '#coverage']] as $i => $link) {
            $company->links()->create(['label' => $link[0], 'url' => $link[1], 'order' => $i]);
        }

        $legal = FooterColumn::create(['title' => 'Legal', 'order' => 1]);
        foreach ([['Terms', '#terms'], ['Privacy', '#privacy']] as $i => $link) {
            $legal->links()->create(['label' => $link[0], 'url' => $link[1], 'order' => $i]);
        }

        $resources = FooterColumn::create(['title' => 'Resources', 'order' => 2]);
        foreach ([['News', '#news'], ['Impact Stories', '#stories'], ['Reports', '#reports'], ['Application Form', '#forms']] as $i => $link) {
            $resources->links()->create(['label' => $link[0], 'url' => $link[1], 'order' => $i]);
        }

        $info = FooterColumn::create(['title' => 'Information', 'order' => 3]);
        foreach ([['Enssure I', '#enssure1'], ['Database', '#database'], ['Documents/Reports', '#documents'], ['Courses/Guidelines', '#courses']] as $i => $link) {
            $info->links()->create(['label' => $link[0], 'url' => $link[1], 'order' => $i]);
        }

        if (! FooterSetting::exists()) {
            FooterSetting::create([
                'copyright_text' => '© Copyright 2008 - 2026 enssure | Privacy Policy | Terms of Service',
                'social_links' => [
                    ['platform' => 'facebook', 'url' => 'https://facebook.com'],
                    ['platform' => 'x', 'url' => 'https://x.com'],
                    ['platform' => 'youtube', 'url' => 'https://youtube.com'],
                ],
            ]);
        }
    }
}
