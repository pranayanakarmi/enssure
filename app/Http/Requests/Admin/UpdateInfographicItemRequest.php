<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInfographicItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Temporarily bypass authorization
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'alt_text' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0|max:999999',
        ];
    }
}
