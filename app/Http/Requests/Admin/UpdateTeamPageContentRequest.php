<?php

namespace App\Http\Requests\Admin;

use App\Models\TeamPageContent;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTeamPageContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        $content = TeamPageContent::first();

        return $content
            ? $this->user()->can('update', $content)
            : $this->user()->can('create', TeamPageContent::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:65535'],
            'banner_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'remove_banner_image' => ['nullable', 'boolean'],
        ];
    }
}
