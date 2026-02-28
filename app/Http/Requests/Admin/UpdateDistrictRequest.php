<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDistrictRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('district'));
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'province_id' => ['nullable', 'integer', 'exists:provinces,id'],
            'name' => ['required', 'string', 'max:255'],
        ];
    }
}
