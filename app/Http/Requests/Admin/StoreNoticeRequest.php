<?php

namespace App\Http\Requests\Admin;

use App\Models\Notice;
use Illuminate\Foundation\Http\FormRequest;

class StoreNoticeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Notice::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'notice_type' => ['nullable', 'string', 'max:50'],
            'content' => ['nullable', 'string'],
            'attachment' => ['nullable', 'string', 'max:255'],
            'deadline_date' => ['nullable', 'date'],
            'is_featured' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
