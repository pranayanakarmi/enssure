<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProvinceRequest;
use App\Http\Requests\Admin\UpdateProvinceRequest;
use App\Models\Province;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProvinceController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Province::class);

        $provinces = Province::orderBy('name')
            ->get()
            ->map(fn (Province $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'province_number' => $p->province_number,
                'capital' => $p->capital,
                'is_covered' => $p->is_covered,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/provinces/index', [
            'provinces' => $provinces,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Province::class);

        return Inertia::render('admin/provinces/create');
    }

    public function store(StoreProvinceRequest $request): RedirectResponse
    {
        Province::create($request->validated());

        return to_route('admin.provinces.index')
            ->with('success', 'Province created successfully.');
    }

    public function edit(Province $province): Response
    {
        $this->authorize('update', $province);

        $p = $province;

        return Inertia::render('admin/provinces/edit', [
            'province' => [
                'id' => $p->id,
                'name' => $p->name,
                'province_number' => $p->province_number,
                'capital' => $p->capital,
                'is_covered' => $p->is_covered,
            ],
        ]);
    }

    public function update(UpdateProvinceRequest $request, Province $province): RedirectResponse
    {
        $province->update($request->validated());

        return to_route('admin.provinces.index')
            ->with('success', 'Province updated successfully.');
    }

    public function destroy(Province $province): RedirectResponse
    {
        $this->authorize('delete', $province);

        $province->delete();

        return to_route('admin.provinces.index')
            ->with('success', 'Province deleted successfully.');
    }
}
