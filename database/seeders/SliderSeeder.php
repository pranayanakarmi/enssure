<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    public function run(): void
    {
        $heroSlider = Slider::where('location', '/')->first();
        if ($heroSlider && $heroSlider->items()->count() > 0) {
            return;
        }

        if (! $heroSlider) {
            $heroSlider = Slider::create([
                'name' => 'Home Page Slider',
                'location' => '/',
            ]);
        }

        $items = [
            [
                'title' => 'Pre-Diploma Level Industrial Trainee Training (Apprenticeship)',
                'subtitle' => null,
                'description' => null,
                'link_url' => '/home',
                'link_text' => 'Learn More',
                'order' => 1,
            ],
            [
                'title' => 'Training with OJT',
                'subtitle' => null,
                'description' => null,
                'link_url' => '/training-with-ojt',
                'link_text' => 'Go To',
                'order' => 2,
            ],
        ];

        foreach ($items as $item) {
            $heroSlider->items()->create($item);
        }
    }
}
