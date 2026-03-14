<?php

namespace App\Http\Requests\Admin;

use App\Models\ImpactStory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('impact_stories', 'slug')],
            'person_title' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'story' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp'],
            'video_url' => ['nullable', 'string', 'max:255'],
        ];
    }
}
