<?php

namespace App\Http\Requests\Admin;

use App\Models\ImpactPageSection;
use Illuminate\Foundation\Http\FormRequest;

class UpdateImpactPageSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $section = ImpactPageSection::first();

        return $section
            ? $this->user()->can('update', $section)
            : $this->user()->can('create', ImpactPageSection::class);
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
