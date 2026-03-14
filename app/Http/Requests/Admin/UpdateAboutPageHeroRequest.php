<?php

namespace App\Http\Requests\Admin;

use App\Models\AboutPageHero;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAboutPageHeroRequest extends FormRequest
{
    public function authorize(): bool
    {
        $hero = AboutPageHero::first();

        return $hero
            ? $this->user()->can('update', $hero)
            : $this->user()->can('create', AboutPageHero::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:255'],
            'hero_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'remove_hero_image' => ['nullable', 'boolean'],
        ];
    }
}
