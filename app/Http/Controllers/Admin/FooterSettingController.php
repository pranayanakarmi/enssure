<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateFooterSettingRequest;
use App\Models\FooterSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FooterSettingController extends Controller
{
    public function edit(): Response
    {
        $setting = FooterSetting::first()
            ?? FooterSetting::create([
                'copyright_text' => '© Copyright 2008 - 2026 enssure | Privacy Policy | Terms of Service',
                'social_links' => [
                    ['platform' => 'facebook', 'url' => 'https://facebook.com'],
                    ['platform' => 'x', 'url' => 'https://x.com'],
                    ['platform' => 'youtube', 'url' => 'https://youtube.com'],
                ],
            ]);

        $this->authorize('update', $setting);

        return Inertia::render('admin/footer_settings/edit', [
            'footerSetting' => [
                'id' => $setting->id,
                'copyright_text' => $setting->copyright_text,
                'social_links' => $setting->social_links ?? [],
            ],
        ]);
    }

    public function update(UpdateFooterSettingRequest $request): RedirectResponse
    {
        $setting = FooterSetting::first();

        if (! $setting) {
            $setting = FooterSetting::create($request->safe()->only(['copyright_text', 'social_links']));
            $this->authorize('update', $setting);

            return back()->with('success', 'Footer settings saved.');
        }

        $this->authorize('update', $setting);

        $setting->update($request->safe()->only(['copyright_text', 'social_links']));

        return back()->with('success', 'Footer settings saved.');
    }
}
