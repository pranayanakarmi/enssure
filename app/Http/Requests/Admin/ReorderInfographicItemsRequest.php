<?php

namespace App\Http\Requests\Admin;

use App\Models\Infographic;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class ReorderInfographicItemsRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var Infographic $infographic */
        $infographic = $this->route('infographic');

        return $this->user()->can('update', $infographic);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        /** @var Infographic $infographic */
        $infographic = $this->route('infographic');

        return [
            'item_ids' => ['required', 'array'],
            'item_ids.*' => [
                'integer',
                Rule::exists('infographic_items', 'id')->where('infographic_id', $infographic->id),
            ],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            if ($validator->errors()->isNotEmpty()) {
                return;
            }

            /** @var Infographic $infographic */
            $infographic = $this->route('infographic');
            $received = array_values(array_map(static fn (mixed $id): int => (int) $id, $this->input('item_ids', [])));
            $expected = $infographic->items()->pluck('id')->map(static fn (mixed $id): int => (int) $id)->sort()->values()->all();
            $receivedSorted = $received;
            sort($receivedSorted);

            if ($receivedSorted !== $expected) {
                $validator->errors()->add(
                    'item_ids',
                    'The list must include every infographic item exactly once.'
                );
            }
        });
    }
}
