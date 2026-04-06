<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateInfographicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('infographic'));
    }

    protected function prepareForValidation(): void
    {
        if ($this->filled('slug')) {
            $normalized = Str::slug($this->string('slug')->toString());
            $this->merge(['slug' => $normalized !== '' ? $normalized : null]);
        }
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        $infographic = $this->route('infographic');
        return [
            'title' => 'required|string|max:255',
            'hero_title' => 'nullable|string|max:255',
            'slug' => ['required', 'string', 'max:255', Rule::unique('infographics')->ignore($infographic)],
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'url' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'is_published' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
            'banner_image' => 'nullable|image|max:2048',
            'remove_banner' => 'boolean',
        ];
    }
}
