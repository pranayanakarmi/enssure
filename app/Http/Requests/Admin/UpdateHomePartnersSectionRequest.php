<?php

namespace App\Http\Requests\Admin;

use App\Models\HomePartnersSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHomePartnersSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = HomePartnersSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', HomePartnersSection::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'badge_text' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string'],
        ];
    }
}
