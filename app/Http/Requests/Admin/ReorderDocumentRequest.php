<?php

namespace App\Http\Requests\Admin;

use App\Models\Document;
use Illuminate\Foundation\Http\FormRequest;

class ReorderDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', new Document);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'documents' => ['required', 'array', 'min:1'],
            'documents.*.id' => ['required', 'integer', 'exists:documents,id'],
            'documents.*.order' => ['required', 'integer', 'min:0'],
        ];
    }
}
