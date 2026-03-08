<?php

namespace Database\Seeders;

use App\Models\HomeContactCtaSection;
use Illuminate\Database\Seeder;

class HomeContactCtaSectionSeeder extends Seeder
{
    public function run(): void
    {
        if (HomeContactCtaSection::count() > 0) {
            return;
        }

        HomeContactCtaSection::create([
            'badge_text' => 'JOIN US',
            'title' => 'Build Skills, Build Futures. Support sustainable employment today.',
            'highlight_phrase' => 'Support sustainable',
            'button_text' => 'Contact us',
        ]);
    }
}
