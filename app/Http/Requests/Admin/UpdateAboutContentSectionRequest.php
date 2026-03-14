<?php

namespace App\Http\Requests\Admin;

use App\Models\AboutContentSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAboutContentSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = AboutContentSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', AboutContentSection::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'paragraph_1' => ['nullable', 'string'],
            'paragraph_2' => ['nullable', 'string'],
        ];
    }
}
