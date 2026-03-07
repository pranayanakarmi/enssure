<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFooterColumnRequest;
use App\Http\Requests\Admin\UpdateFooterColumnRequest;
use App\Models\FooterColumn;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FooterColumnController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', FooterColumn::class);

        $columns = FooterColumn::orderBy('order')
            ->withCount('links')
            ->get()
            ->map(fn (FooterColumn $c) => [
                'id' => $c->id,
                'title' => $c->title,
                'order' => $c->order,
                'links_count' => $c->links_count,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/footer_columns/index', [
            'footerColumns' => $columns,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', FooterColumn::class);

        return Inertia::render('admin/footer_columns/create');
    }

    public function store(StoreFooterColumnRequest $request): RedirectResponse
    {
        $order = $request->validated('order');
        if ($order === null) {
            $max = FooterColumn::max('order');

            $order = $max !== null ? (int) $max + 1 : 0;
        }
        FooterColumn::create([
            'title' => $request->validated('title'),
            'order' => (int) $order,
        ]);

        return to_route('admin.footer-columns.index')
            ->with('success', 'Footer column created.');
    }

    public function edit(FooterColumn $footer_column): Response
    {
        $this->authorize('update', $footer_column);

        $footer_column->load(['links' => fn ($q) => $q->orderBy('order')]);

        return Inertia::render('admin/footer_columns/edit', [
            'footerColumn' => [
                'id' => $footer_column->id,
                'title' => $footer_column->title,
                'order' => $footer_column->order,
                'links' => $footer_column->links->map(fn ($link) => [
                    'id' => $link->id,
                    'label' => $link->label,
                    'url' => $link->url,
                    'order' => $link->order,
                ])->values()->all(),
            ],
        ]);
    }

    public function update(UpdateFooterColumnRequest $request, FooterColumn $footer_column): RedirectResponse
    {
        $footer_column->update($request->validated());

        return back()->with('success', 'Footer column updated.');
    }

    public function destroy(FooterColumn $footer_column): RedirectResponse
    {
        $this->authorize('delete', $footer_column);

        $footer_column->delete();

        return to_route('admin.footer-columns.index')
            ->with('success', 'Footer column deleted.');
    }
}
