<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSiteSettingRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function edit(): Response
    {
        $setting = SiteSetting::first()
            ?? SiteSetting::create([
                'facebook_url' => 'https://facebook.com',
                'x_url' => 'https://x.com',
                'youtube_url' => 'https://youtube.com',
                'header_phone_1' => '+977 1 6636073/6636191',
                'header_phone_2' => '+977 1 6632091',
                'header_email' => 'enssure.np@helvetas.org',
            ]);

        $this->authorize('update', $setting);

        return Inertia::render('admin/site_settings/edit', [
            'siteSetting' => [
                'id' => $setting->id,
                'facebook_url' => $setting->facebook_url,
                'x_url' => $setting->x_url,
                'youtube_url' => $setting->youtube_url,
                'header_phone_1' => $setting->header_phone_1,
                'header_phone_2' => $setting->header_phone_2,
                'header_fax' => $setting->header_fax,
                'header_email' => $setting->header_email,
                'visit_us' => $setting->visit_us,
                'working_hours' => $setting->working_hours,
                'province_contacts' => $setting->province_contacts,
                'logo_left_url' => $setting->logo_left
                    ? Storage::disk('public')->url($setting->logo_left)
                    : null,
                'logo_center_url' => $setting->logo_center
                    ? Storage::disk('public')->url($setting->logo_center)
                    : null,
                'logo_right_url' => $setting->logo_right
                    ? Storage::disk('public')->url($setting->logo_right)
                    : null,
                'footer_privacy_policy_url' => $setting->footer_privacy_policy_url,
                'footer_terms_of_service_url' => $setting->footer_terms_of_service_url,
            ],
        ]);
    }

    public function update(UpdateSiteSettingRequest $request): RedirectResponse
    {
        $setting = SiteSetting::first();

        if (! $setting) {
            $setting = SiteSetting::create([]);
            $this->authorize('update', $setting);
        } else {
            $this->authorize('update', $setting);
        }

        $data = collect($request->validated())
            ->except(['logo_left', 'logo_center', 'logo_right'])
            ->map(fn ($v) => $v === '' ? null : $v)
            ->all();

        foreach (['logo_left', 'logo_center', 'logo_right'] as $field) {
            if ($request->hasFile($field)) {
                if ($setting->{$field}) {
                    Storage::disk('public')->delete($setting->{$field});
                }
                $data[$field] = $request->file($field)->store('site-logos', 'public');
            }
        }

        $setting->update($data);

        return back()->with('success', 'Site settings saved.');
    }
}
