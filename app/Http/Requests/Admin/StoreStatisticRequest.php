<?php

namespace App\Http\Requests\Admin;

use App\Models\Statistic;
use Illuminate\Foundation\Http\FormRequest;

class StoreStatisticRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Statistic::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'stat_key' => ['required', 'string', 'max:255', 'unique:statistics,stat_key'],
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
