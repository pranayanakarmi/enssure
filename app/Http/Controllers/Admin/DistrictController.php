<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDistrictRequest;
use App\Http\Requests\Admin\UpdateDistrictRequest;
use App\Models\District;
use App\Models\Province;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DistrictController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', District::class);

        $districts = District::with('province')
            ->orderBy('name')
            ->get()
            ->map(fn (District $d) => [
                'id' => $d->id,
                'name' => $d->name,
                'province_id' => $d->province_id,
                'province' => $d->province ? ['id' => $d->province->id, 'name' => $d->province->name] : null,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/districts/index', [
            'districts' => $districts,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', District::class);

        $provinces = Province::orderBy('name')->get(['id', 'name']);

        return Inertia::render('admin/districts/create', [
            'provinces' => $provinces,
        ]);
    }

    public function store(StoreDistrictRequest $request): RedirectResponse
    {
        District::create($request->validated());

        return to_route('admin.districts.index')
            ->with('success', 'District created successfully.');
    }

    public function edit(District $district): Response
    {
        $this->authorize('update', $district);

        $d = $district;
        $provinces = Province::orderBy('name')->get(['id', 'name']);

        return Inertia::render('admin/districts/edit', [
            'district' => [
                'id' => $d->id,
                'province_id' => $d->province_id,
                'name' => $d->name,
            ],
            'provinces' => $provinces,
        ]);
    }

    public function update(UpdateDistrictRequest $request, District $district): RedirectResponse
    {
        $district->update($request->validated());

        return to_route('admin.districts.index')
            ->with('success', 'District updated successfully.');
    }

    public function destroy(District $district): RedirectResponse
    {
        $this->authorize('delete', $district);

        $district->delete();

        return to_route('admin.districts.index')
            ->with('success', 'District deleted successfully.');
    }
}
