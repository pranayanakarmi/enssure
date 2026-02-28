<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStatisticRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('statistic'));
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        $statistic = $this->route('statistic');

        return [
            'stat_key' => ['required', 'string', 'max:255', Rule::unique('statistics', 'stat_key')->ignore($statistic->id)],
            'stat_label' => ['nullable', 'string', 'max:255'],
            'stat_value' => ['nullable', 'string', 'max:255'],
            'stat_prefix' => ['nullable', 'string', 'max:10'],
            'stat_suffix' => ['nullable', 'string', 'max:10'],
            'icon' => ['nullable', 'string', 'max:255'],
            'is_visible' => ['boolean'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
