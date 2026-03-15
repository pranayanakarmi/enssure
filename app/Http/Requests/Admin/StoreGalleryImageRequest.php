<?php

namespace App\Http\Requests\Admin;

use App\Models\GalleryImage;
use Illuminate\Foundation\Http\FormRequest;

class StoreGalleryImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', GalleryImage::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'caption' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
