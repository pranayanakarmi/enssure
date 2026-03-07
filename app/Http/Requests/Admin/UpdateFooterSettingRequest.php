<?php

namespace App\Http\Requests\Admin;

use App\Models\FooterSetting;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFooterSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        $setting = FooterSetting::first();

        return $setting
            ? $this->user()->can('update', $setting)
            : $this->user()->can('create', FooterSetting::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'copyright_text' => ['nullable', 'string'],
            'social_links' => ['nullable', 'array'],
            'social_links.*.platform' => ['required_with:social_links', 'string', 'max:50'],
            'social_links.*.url' => ['nullable', 'string', 'max:2048'],
        ];
    }
}
