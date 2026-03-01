<?php

namespace App\Http\Requests\Admin;

use App\Models\HomeAboutSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHomeAboutSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = HomeAboutSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', HomeAboutSection::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'badge_text' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:500'],
            'body' => ['nullable', 'string'],
            'card_title' => ['nullable', 'string', 'max:255'],
            'content_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'background_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'cta_text' => ['nullable', 'string', 'max:255'],
            'cta_url' => ['nullable', 'string', 'max:500'],
        ];
    }
}
