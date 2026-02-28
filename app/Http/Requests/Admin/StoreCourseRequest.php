<?php

namespace App\Http\Requests\Admin;

use App\Models\Course;
use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Course::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'training_program_id' => ['nullable', 'integer', 'exists:training_programs,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'course_code' => ['nullable', 'string', 'max:50'],
            'duration' => ['nullable', 'string', 'max:100'],
            'prerequisites' => ['nullable', 'string'],
            'syllabus_file' => ['nullable', 'string', 'max:255'],
            'guideline_file' => ['nullable', 'string', 'max:255'],
        ];
    }
}
