<?php

namespace App\Http\Requests\Admin;

use App\Models\HomeTestimonialsSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHomeTestimonialsSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = HomeTestimonialsSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', HomeTestimonialsSection::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'badge_text' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'background_image' => ['nullable', 'image', 'max:5120'],
        ];
    }
}
