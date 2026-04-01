<?php

namespace App\Http\Requests\Admin;

use App\Models\PageHero;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePageHeroRequest extends FormRequest
{
    public function authorize(): bool
    {
        $hero = PageHero::first();

        return $hero
            ? $this->user()->can('update', $hero)
            : $this->user()->can('create', PageHero::class);
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
