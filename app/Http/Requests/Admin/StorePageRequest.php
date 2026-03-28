<?php

namespace App\Http\Requests\Admin;

use App\Models\Page;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StorePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Page::class);
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('parent_id') && $this->input('parent_id') === '') {
            $this->merge(['parent_id' => null]);
        } elseif ($this->has('parent_id') && is_numeric($this->input('parent_id'))) {
            $this->merge(['parent_id' => (int) $this->input('parent_id')]);
        }
        if ($this->has('published_at') && $this->input('published_at') === '') {
            $this->merge(['published_at' => null]);
        }
        if ($this->has('slug') && trim((string) $this->input('slug')) === '') {
            $this->merge(['slug' => null]);
        }
        if ($this->input('slug') === null && $this->filled('title')) {
            $this->merge(['slug' => Str::slug($this->string('title')->toString())]);
        }
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('pages', 'slug')],
            'content' => ['nullable', 'string'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'parent_id' => ['nullable', 'integer', 'exists:pages,id'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
