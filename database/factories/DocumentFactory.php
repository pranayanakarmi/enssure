<?php

namespace Database\Factories;

use App\Models\Document;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Document>
 */
class DocumentFactory extends Factory
{
    protected $model = Document::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => null,
            'document_type' => 'report',
            'file_path' => 'documents/'.fake()->uuid().'.pdf',
            'file_size' => 1024,
            'file_extension' => 'pdf',
            'order' => 0,
        ];
    }

    public function notPdf(): static
    {
        return $this->state(fn (array $attributes) => [
            'file_extension' => 'doc',
            'file_path' => 'documents/'.fake()->uuid().'.doc',
        ]);
    }
}
