<?php

namespace App\Http\Requests\Admin;

use App\Models\HomeContactCtaSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHomeContactCtaSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = HomeContactCtaSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', HomeContactCtaSection::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'badge_text' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string'],
            'highlight_phrase' => ['nullable', 'string', 'max:255'],
            'button_text' => ['nullable', 'string', 'max:255'],
            'background_image' => ['nullable', 'image', 'max:5120'],
        ];
    }
}
