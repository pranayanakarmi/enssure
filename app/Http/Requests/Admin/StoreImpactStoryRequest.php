<?php

namespace App\Http\Requests\Admin;

use App\Models\ImpactStory;
use Illuminate\Foundation\Http\FormRequest;

class StoreImpactStoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', ImpactStory::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'person_name' => ['nullable', 'string', 'max:255'],
            'person_title' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'story' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
            'video_url' => ['nullable', 'string', 'max:255'],
            'published_at' => ['nullable', 'date'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
