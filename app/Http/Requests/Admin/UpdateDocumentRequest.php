<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('document'));
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'document_type' => ['required', 'string', 'exists:document_types,slug'],
            'order' => ['required', 'integer', 'min:0'],
            'file' => ['sometimes', 'file', 'mimes:pdf', 'max:20480'],
        ];
    }
}
