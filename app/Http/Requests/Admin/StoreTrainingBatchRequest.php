<?php

namespace App\Http\Requests\Admin;

use App\Models\TrainingBatch;
use Illuminate\Foundation\Http\FormRequest;

class StoreTrainingBatchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', TrainingBatch::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'batch_name' => ['required', 'string', 'max:255'],
            'batch_code' => ['nullable', 'string', 'max:50'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'training_center' => ['nullable', 'string', 'max:255'],
            'instructor_name' => ['nullable', 'string', 'max:255'],
            'max_capacity' => ['nullable', 'integer', 'min:0'],
            'current_enrollment' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'string', 'max:50'],
            'schedule_details' => ['nullable', 'string'],
        ];
    }
}
