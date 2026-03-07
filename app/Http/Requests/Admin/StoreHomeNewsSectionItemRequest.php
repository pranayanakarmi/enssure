<?php

namespace App\Http\Requests\Admin;

use App\Models\HomeNewsSectionItem;
use Illuminate\Foundation\Http\FormRequest;

class StoreHomeNewsSectionItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', HomeNewsSectionItem::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:500'],
            'image' => ['nullable', 'image', 'max:5120'],
            'link_url' => ['nullable', 'string', 'max:2048'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
