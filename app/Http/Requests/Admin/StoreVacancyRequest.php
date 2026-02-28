<?php

namespace App\Http\Requests\Admin;

use App\Models\Vacancy;
use Illuminate\Foundation\Http\FormRequest;

class StoreVacancyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Vacancy::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'position_title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'job_description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'job_type' => ['nullable', 'string', 'max:30'],
            'number_of_positions' => ['nullable', 'integer', 'min:1'],
            'application_deadline' => ['nullable', 'date'],
            'application_instructions' => ['nullable', 'string'],
            'tor_file' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string', 'max:30'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
