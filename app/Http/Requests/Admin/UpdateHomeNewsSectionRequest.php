<?php

namespace App\Http\Requests\Admin;

use App\Models\HomeNewsSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHomeNewsSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = HomeNewsSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', HomeNewsSection::class);
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
            'cta_text' => ['nullable', 'string', 'max:255'],
            'cta_url' => ['nullable', 'string', 'max:2048'],
        ];
    }
}
