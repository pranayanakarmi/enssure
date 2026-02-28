<?php

namespace App\Http\Requests\Admin;

use App\Models\EventRegistration;
use Illuminate\Foundation\Http\FormRequest;

class StoreEventRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', EventRegistration::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'phone' => ['nullable', 'string', 'max:50'],
            'additional_info' => ['nullable', 'array'],
            'status' => ['nullable', 'string', 'in:pending,confirmed,cancelled'],
        ];
    }
}
