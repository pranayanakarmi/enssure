<?php

namespace App\Http\Requests\Admin;

use App\Models\PostHero;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePostHeroRequest extends FormRequest
{
    public function authorize(): bool
    {
        $hero = PostHero::first();

        return $hero
            ? $this->user()->can('update', $hero)
            : $this->user()->can('create', PostHero::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'hero_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'remove_hero_image' => ['nullable', 'boolean'],
        ];
    }
}
