<?php

namespace App\Http\Requests\Admin;

use App\Models\HomeCoverageSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHomeCoverageSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = HomeCoverageSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', HomeCoverageSection::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'badge_text' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'map_image' => ['nullable', 'image', 'max:5120'],
        ];
    }
}
