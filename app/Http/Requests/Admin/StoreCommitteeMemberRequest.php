<?php

namespace App\Http\Requests\Admin;

use App\Models\CommitteeMember;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommitteeMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', CommitteeMember::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
