<?php

namespace App\Http\Requests\Admin;

use App\Models\FooterLink;
use Illuminate\Foundation\Http\FormRequest;

class StoreFooterLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', FooterLink::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'label' => ['required', 'string', 'max:255'],
            'url' => ['nullable', 'string', 'max:2048'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
