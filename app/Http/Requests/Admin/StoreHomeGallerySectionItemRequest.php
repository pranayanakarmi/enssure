<?php

namespace App\Http\Requests\Admin;

use App\Models\HomeGallerySectionItem;
use Illuminate\Foundation\Http\FormRequest;

class StoreHomeGallerySectionItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', HomeGallerySectionItem::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'text' => ['nullable', 'string', 'max:500'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
