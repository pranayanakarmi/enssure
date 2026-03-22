<?php

namespace App\Http\Requests\Admin;

use App\Models\ContactFeedbackContent;
use Illuminate\Foundation\Http\FormRequest;

class UpdateContactFeedbackContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        $content = ContactFeedbackContent::first();

        return $content
            ? $this->user()->can('update', $content)
            : $this->user()->can('create', ContactFeedbackContent::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:500'],
            'description' => ['nullable', 'string', 'max:20000'],
        ];
    }
}
