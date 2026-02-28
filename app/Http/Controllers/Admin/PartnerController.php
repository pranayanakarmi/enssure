<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePartnerRequest;
use App\Http\Requests\Admin\UpdatePartnerRequest;
use App\Models\Partner;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Partner::class);

        $partners = Partner::orderBy('order')
            ->get()
            ->map(fn (Partner $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'logo' => $p->logo,
                'website_url' => $p->website_url,
                'partner_type' => $p->partner_type,
                'order' => $p->order,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/partners/index', [
            'partners' => $partners,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Partner::class);

        return Inertia::render('admin/partners/create');
    }

    public function store(StorePartnerRequest $request): RedirectResponse
    {
        Partner::create($request->validated());

        return to_route('admin.partners.index')
            ->with('success', 'Partner created successfully.');
    }

    public function edit(Partner $partner): Response
    {
        $this->authorize('update', $partner);

        return Inertia::render('admin/partners/edit', [
            'partner' => [
                'id' => $partner->id,
                'name' => $partner->name,
                'logo' => $partner->logo,
                'website_url' => $partner->website_url,
                'partner_type' => $partner->partner_type,
                'description' => $partner->description,
                'order' => $partner->order,
            ],
        ]);
    }

    public function update(UpdatePartnerRequest $request, Partner $partner): RedirectResponse
    {
        $partner->update($request->validated());

        return to_route('admin.partners.index')
            ->with('success', 'Partner updated successfully.');
    }

    public function destroy(Partner $partner): RedirectResponse
    {
        $this->authorize('delete', $partner);

        $partner->delete();

        return to_route('admin.partners.index')
            ->with('success', 'Partner deleted successfully.');
    }
}
