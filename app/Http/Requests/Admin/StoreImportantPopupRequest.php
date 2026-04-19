<?php

namespace App\Http\Requests\Admin;

use App\Models\ImportantPopup;
use Illuminate\Foundation\Http\FormRequest;

class StoreImportantPopupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', ImportantPopup::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'cta_text' => ['nullable', 'string', 'max:120'],
            'cta_url' => ['nullable', 'url', 'max:2048'],
            'video_url' => ['nullable', 'string', 'max:255', 'regex:/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
