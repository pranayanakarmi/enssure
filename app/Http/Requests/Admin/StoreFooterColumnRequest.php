<?php

namespace App\Http\Requests\Admin;

use App\Models\FooterColumn;
use Illuminate\Foundation\Http\FormRequest;

class StoreFooterColumnRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', FooterColumn::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
