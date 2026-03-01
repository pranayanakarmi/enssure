<?php

namespace App\Http\Requests\Admin;

use App\Models\HomeReachItem;
use Illuminate\Foundation\Http\FormRequest;

class StoreHomeReachItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', HomeReachItem::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'value' => ['nullable', 'string', 'max:100'],
            'suffix' => ['nullable', 'string', 'max:20'],
            'label' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:5120'],
            'link_url' => ['nullable', 'string', 'max:2048'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
