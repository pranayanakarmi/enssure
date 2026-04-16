<?php

namespace App\Http\Requests\Admin;

use App\Models\SiteSetting;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        $setting = SiteSetting::first();

        return $setting
            ? $this->user()->can('update', $setting)
            : $this->user()->can('create', SiteSetting::class);
    }

    /**
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    public function rules(): array
    {
        return [
            'facebook_url' => ['nullable', 'string', 'max:2048'],
            'x_url' => ['nullable', 'string', 'max:2048'],
            'youtube_url' => ['nullable', 'string', 'max:2048'],
            'header_phone_1' => ['nullable', 'string', 'max:50'],
            'header_phone_2' => ['nullable', 'string', 'max:50'],
            'header_fax' => ['nullable', 'string', 'max:50'],
            'header_email' => ['nullable', 'email', 'max:255'],
            'visit_us' => ['required', 'string', 'max:255'],
            'working_hours' => ['required', 'string', 'max:255'],
            'province_contacts' => ['nullable', 'array'],
            'province_contacts.*.province' => ['nullable', 'string', 'max:255'],
            'province_contacts.*.name' => ['nullable', 'string', 'max:255'],
            'province_contacts.*.position' => ['nullable', 'string', 'max:255'],
            'province_contacts.*.phone' => ['nullable', 'string', 'max:50'],
            'province_contacts.*.email' => ['nullable', 'string', 'max:255'],
            'province_contacts.*.address' => ['nullable', 'string', 'max:255'],
            'logo_left' => ['nullable', 'file', 'mimes:jpeg,jpg,png,gif,webp,svg', 'max:2048'],
            'logo_center' => ['nullable', 'file', 'mimes:jpeg,jpg,png,gif,webp,svg', 'max:2048'],
            'logo_right' => ['nullable', 'file', 'mimes:jpeg,jpg,png,gif,webp,svg', 'max:2048'],
            'footer_privacy_policy_url' => ['nullable', 'string', 'max:2048'],
            'footer_terms_of_service_url' => ['nullable', 'string', 'max:2048'],
        ];
    }
}
