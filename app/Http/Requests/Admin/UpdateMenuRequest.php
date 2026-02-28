<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMenuRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('menu'));
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'is_published' => ['required', 'boolean'],
            'is_main_header_menu' => ['required', 'boolean'],
        ];
    }

    /**
     * Ensure checkbox values are always present so they are validated and persisted.
     */
    protected function prepareForValidation(): void
    {
        $menu = $this->route('menu');

        $this->merge([
            'is_published' => $this->has('is_published') ? $this->boolean('is_published') : $menu->is_published,
            'is_main_header_menu' => $this->has('is_main_header_menu') ? $this->boolean('is_main_header_menu') : $menu->is_main_header_menu,
        ]);
    }
}
