<?php

namespace App\Http\Requests\Admin;

use App\Models\InfographicItem;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInfographicItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        /** @var InfographicItem $infographicItem */
        $infographicItem = $this->route('infographic_item');

        return $this->user()->can('update', $infographicItem->infographic);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:10240'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:999999'],
        ];
    }
}
