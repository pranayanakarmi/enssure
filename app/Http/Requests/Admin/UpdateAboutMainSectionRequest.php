<?php

namespace App\Http\Requests\Admin;

use App\Models\AboutMainSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAboutMainSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = AboutMainSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', AboutMainSection::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:500'],
            'body' => ['nullable', 'string'],
            'card_title' => ['nullable', 'string', 'max:255'],
            'content_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'background_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp'],
            'cta_text' => ['nullable', 'string', 'max:255'],
            'cta_url' => ['nullable', 'string', 'max:500'],
        ];
    }
}
