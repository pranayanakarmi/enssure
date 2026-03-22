<?php

namespace App\Http\Requests\Admin;

use App\Models\Infographic;
use Illuminate\Foundation\Http\FormRequest;

class StoreInfographicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Infographic::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:10240'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:999999'],
        ];
    }
}
