<?php

namespace App\Http\Requests\Admin;

use App\Models\NewsTickerItem;
use Illuminate\Foundation\Http\FormRequest;

class StoreNewsTickerItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', NewsTickerItem::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:500'],
            'url' => ['nullable', 'string', 'max:2048'],
            'order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['nullable', 'boolean'],
        ];
    }
}
