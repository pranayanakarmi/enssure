<?php

namespace App\Http\Requests\Admin;

use App\Models\Committee;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommitteeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Committee::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'committee_type' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'formation_date' => ['nullable', 'date'],
        ];
    }
}
