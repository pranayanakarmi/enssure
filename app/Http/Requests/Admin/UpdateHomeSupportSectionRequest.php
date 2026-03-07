<?php

namespace App\Http\Requests\Admin;

use App\Models\HomeSupportSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHomeSupportSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = HomeSupportSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', HomeSupportSection::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'badge_text' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ];
    }
}
