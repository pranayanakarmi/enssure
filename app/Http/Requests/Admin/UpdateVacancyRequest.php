<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVacancyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('vacancy'));
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'position_title' => ['required', 'string', 'max:255'],
            'job_description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'job_type' => ['nullable', 'string', Rule::in(['full_time', 'part_time', 'contract'])],
            'number_of_positions' => ['nullable', 'integer', 'min:1'],
            'application_deadline' => ['nullable', 'date'],
            'application_instructions' => ['nullable', 'string'],
            'tor_file' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string', Rule::in(['open', 'closed'])],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
