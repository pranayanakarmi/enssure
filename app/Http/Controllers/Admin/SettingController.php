<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSettingRequest;
use App\Http\Requests\Admin\UpdateSettingRequest;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Setting::class);

        $settings = Setting::orderBy('group')
            ->orderBy('key')
            ->get()
            ->map(fn (Setting $s) => [
                'id' => $s->id,
                'key' => $s->key,
                'value' => $s->value,
                'type' => $s->type,
                'group' => $s->group,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Setting::class);

        return Inertia::render('admin/settings/create');
    }

    public function store(StoreSettingRequest $request): RedirectResponse
    {
        Setting::create($request->validated());

        return to_route('admin.settings.index')
            ->with('success', 'Setting created successfully.');
    }

    public function edit(Setting $setting): Response
    {
        $this->authorize('update', $setting);

        $s = $setting;

        return Inertia::render('admin/settings/edit', [
            'setting' => [
                'id' => $s->id,
                'key' => $s->key,
                'value' => $s->value,
                'type' => $s->type,
                'group' => $s->group,
                'description' => $s->description,
            ],
        ]);
    }

    public function update(UpdateSettingRequest $request, Setting $setting): RedirectResponse
    {
        $setting->update($request->validated());

        return to_route('admin.settings.index')
            ->with('success', 'Setting updated successfully.');
    }

    public function destroy(Setting $setting): RedirectResponse
    {
        $this->authorize('delete', $setting);

        $setting->delete();

        return to_route('admin.settings.index')
            ->with('success', 'Setting deleted successfully.');
    }
}
