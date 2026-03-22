<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFeedbackRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('feedback'));
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'feedback_type' => ['nullable', 'string', 'max:100'],
            'feedbackable_type' => ['nullable', 'string', 'max:255'],
            'feedbackable_id' => ['nullable', 'integer'],
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email'],
            'feedback_text' => ['nullable', 'string'],
            'is_public' => ['nullable', 'boolean'],
        ];
    }
}
