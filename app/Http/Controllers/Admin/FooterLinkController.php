<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFooterLinkRequest;
use App\Http\Requests\Admin\UpdateFooterLinkRequest;
use App\Models\FooterColumn;
use App\Models\FooterLink;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FooterLinkController extends Controller
{
    public function store(StoreFooterLinkRequest $request, FooterColumn $footer_column): RedirectResponse
    {
        $this->authorize('create', FooterLink::class);

        $order = $footer_column->links()->max('order') ?? 0;
        $footer_column->links()->create([
            'label' => $request->validated('label'),
            'url' => $request->validated('url', '#'),
            'order' => $request->validated('order', $order + 1),
        ]);

        return back()->with('success', 'Link added.');
    }

    public function edit(FooterLink $footer_link): Response
    {
        $this->authorize('update', $footer_link);

        $footer_link->load('footerColumn');

        return Inertia::render('admin/footer_links/edit', [
            'footerLink' => [
                'id' => $footer_link->id,
                'label' => $footer_link->label,
                'url' => $footer_link->url,
                'order' => $footer_link->order,
            ],
            'footerColumn' => [
                'id' => $footer_link->footerColumn->id,
                'title' => $footer_link->footerColumn->title,
            ],
        ]);
    }

    public function update(UpdateFooterLinkRequest $request, FooterLink $footer_link): RedirectResponse
    {
        $footer_link->update($request->validated());

        return to_route('admin.footer-columns.edit', $footer_link->footer_column_id)
            ->with('success', 'Link updated.');
    }

    public function destroy(FooterLink $footer_link): RedirectResponse
    {
        $this->authorize('delete', $footer_link);

        $columnId = $footer_link->footer_column_id;
        $footer_link->delete();

        return to_route('admin.footer-columns.edit', $columnId)
            ->with('success', 'Link deleted.');
    }
}
