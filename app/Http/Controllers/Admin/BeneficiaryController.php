<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBeneficiaryRequest;
use App\Http\Requests\Admin\UpdateBeneficiaryRequest;
use App\Models\Beneficiary;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BeneficiaryController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Beneficiary::class);

        $beneficiaries = Beneficiary::orderBy('full_name')
            ->get()
            ->map(fn (Beneficiary $b) => [
                'id' => $b->id,
                'full_name' => $b->full_name,
                'gender' => $b->gender,
                'contact_number' => $b->contact_number,
                'province' => $b->province,
                'district' => $b->district,
                'status' => $b->status,
                'completion_date' => $b->completion_date?->toDateString(),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/beneficiaries/index', [
            'beneficiaries' => $beneficiaries,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Beneficiary::class);

        return Inertia::render('admin/beneficiaries/create');
    }

    public function store(StoreBeneficiaryRequest $request): RedirectResponse
    {
        Beneficiary::create($request->validated());

        return to_route('admin.beneficiaries.index')
            ->with('success', 'Beneficiary created successfully.');
    }

    public function edit(Beneficiary $beneficiary): Response
    {
        $this->authorize('update', $beneficiary);

        $b = $beneficiary;

        return Inertia::render('admin/beneficiaries/edit', [
            'beneficiary' => [
                'id' => $b->id,
                'full_name' => $b->full_name,
                'gender' => $b->gender,
                'date_of_birth' => $b->date_of_birth?->toDateString(),
                'contact_number' => $b->contact_number,
                'province' => $b->province,
                'district' => $b->district,
                'municipality' => $b->municipality,
                'completion_date' => $b->completion_date?->toDateString(),
                'status' => $b->status,
            ],
        ]);
    }

    public function update(UpdateBeneficiaryRequest $request, Beneficiary $beneficiary): RedirectResponse
    {
        $beneficiary->update($request->validated());

        return to_route('admin.beneficiaries.index')
            ->with('success', 'Beneficiary updated successfully.');
    }

    public function destroy(Beneficiary $beneficiary): RedirectResponse
    {
        $this->authorize('delete', $beneficiary);

        $beneficiary->delete();

        return to_route('admin.beneficiaries.index')
            ->with('success', 'Beneficiary deleted successfully.');
    }
}
