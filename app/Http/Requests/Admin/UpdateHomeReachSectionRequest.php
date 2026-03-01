<?php

namespace App\Http\Requests\Admin;

use App\Models\HomeReachSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHomeReachSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = HomeReachSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', HomeReachSection::class);
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
        ];
    }
}
