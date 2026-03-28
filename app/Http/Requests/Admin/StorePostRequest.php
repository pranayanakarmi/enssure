<?php

namespace App\Http\Requests\Admin;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Post::class);
    }

    protected function prepareForValidation(): void
    {
        // Multipart / FormData sends empty file inputs as "" — the `image` rule would fail otherwise.
        if (! $this->hasFile('image')) {
            $this->merge(['image' => null]);
        }

        $tags = $this->input('tags', []);
        if (! is_array($tags)) {
            $tags = $tags === null || $tags === '' ? [] : [$tags];
        }
        $mapped = array_map(static function ($id) {
            if ($id === '' || $id === null) {
                return null;
            }

            return is_numeric($id) ? (int) $id : null;
        }, $tags);
        $tags = array_values(array_filter($mapped, static fn ($id) => $id !== null));
        $this->merge(['tags' => $tags]);

        if ($this->has('category_id') && $this->input('category_id') === '') {
            $this->merge(['category_id' => null]);
        } elseif ($this->has('category_id') && is_numeric($this->input('category_id'))) {
            $this->merge(['category_id' => (int) $this->input('category_id')]);
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
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('posts', 'slug')],
            'excerpt' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'published_at' => ['nullable', 'date'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['integer', 'exists:tags,id'],
        ];
    }
}
