<?php

namespace App\Http\Requests\Admin;

use App\Models\BatchEnrollment;
use Illuminate\Foundation\Http\FormRequest;

class StoreBatchEnrollmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', BatchEnrollment::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'batch_id' => ['required', 'integer', 'exists:training_batches,id'],
            'beneficiary_id' => ['required', 'integer', 'exists:beneficiaries,id'],
            'enrollment_date' => ['nullable', 'date'],
            'status' => ['nullable', 'string', 'max:50'],
            'completion_percentage' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'final_grade' => ['nullable', 'string', 'max:50'],
            'remarks' => ['nullable', 'string'],
        ];
    }
}
