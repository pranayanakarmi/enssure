<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHomeCoverageSectionItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('home_coverage_section_item'));
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'value' => ['nullable', 'string', 'max:100'],
            'label' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'file', 'mimes:jpg,jpeg,png,gif,webp,svg', 'max:2048'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
