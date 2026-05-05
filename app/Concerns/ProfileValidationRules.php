<?php

namespace App\Concerns;

use Illuminate\Validation\Rule;

trait ProfileValidationRules
{
    /**
     * @return array<string, mixed>
     */
    protected function profileRules(?int $userId = null): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                $userId ? Rule::unique('users', 'email')->ignore($userId) : Rule::unique('users', 'email'),
            ],
        ];
    }
}
