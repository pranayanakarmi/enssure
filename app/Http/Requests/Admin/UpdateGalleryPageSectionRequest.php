<?php

namespace App\Http\Requests\Admin;

use App\Models\GalleryPageSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateGalleryPageSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = GalleryPageSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', GalleryPageSection::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ];
    }
}
