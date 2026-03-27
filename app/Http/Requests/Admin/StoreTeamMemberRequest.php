<?php

namespace App\Http\Requests\Admin;

use App\Models\TeamMember;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTeamMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', TeamMember::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'in:executive_committee,staff'],
            'name' => ['required', 'string', 'max:255'],
            'job_title' => ['nullable', 'string', 'max:255'],
            'department' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', Rule::in(TeamMember::LOCATIONS)],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
            'bio' => ['nullable', 'string'],
            'qualifications' => ['nullable', 'string'],
            'expertise' => ['nullable', 'string'],
            'facebook_url' => ['nullable', 'string', 'url', 'max:500'],
            'twitter_url' => ['nullable', 'string', 'url', 'max:500'],
            'social_links' => ['nullable', 'array'],
            'social_links.*' => ['nullable', 'string'],
        ];
    }
}
