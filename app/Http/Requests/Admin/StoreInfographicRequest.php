<?php

namespace App\Http\Requests\Admin;

use App\Models\Infographic;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StoreInfographicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Infographic::class);
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
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('infographics', 'slug')],
        ];
    }
}
