<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'thumbnail' => null,
            'date' => fake()->date(),
            'order' => fake()->numberBetween(0, 20),
            'is_active' => true,
            'is_hero' => false,
        ];
    }

    public function hero(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_hero' => true,
            'is_active' => true,
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
            'is_hero' => false,
        ]);
    }
}
