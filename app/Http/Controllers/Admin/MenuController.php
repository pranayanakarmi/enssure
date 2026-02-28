<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMenuRequest;
use App\Http\Requests\Admin\UpdateMenuRequest;
use App\Models\Menu;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Menu::class);

        $menus = Menu::withCount('allItems')
            ->orderBy('name')
            ->get()
            ->map(fn (Menu $m) => [
                'id' => $m->id,
                'name' => $m->name,
                'is_published' => $m->is_published,
                'is_main_header_menu' => $m->is_main_header_menu,
                'items_count' => $m->all_items_count ?? 0,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/menus/index', [
            'menus' => $menus,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Menu::class);

        return Inertia::render('admin/menus/create');
    }

    public function store(StoreMenuRequest $request): RedirectResponse
    {
        Menu::create($request->validated());

        return to_route('admin.menus.index')
            ->with('success', 'Menu created successfully.');
    }

    public function edit(Menu $menu): Response
    {
        $this->authorize('update', $menu);

        $menu->load(['allItems' => fn ($q) => $q->orderBy('order')]);

        return Inertia::render('admin/menus/edit', [
            'menu' => [
                'id' => $menu->id,
                'name' => $menu->name,
                'is_published' => $menu->is_published,
                'is_main_header_menu' => $menu->is_main_header_menu,
                'items' => $menu->allItems->map(fn ($i) => [
                    'id' => $i->id,
                    'title' => $i->title,
                    'url' => $i->url,
                    'parent_id' => $i->parent_id,
                    'target' => $i->target,
                    'order' => $i->order,
                ])->values()->all(),
                'parentOptions' => $menu->allItems->map(fn ($i) => ['id' => $i->id, 'title' => $i->title])->values()->all(),
            ],
        ]);
    }

    public function update(UpdateMenuRequest $request, Menu $menu): Response|RedirectResponse
    {
        $validated = $request->validated();

        $menu->update([
            'name' => $validated['name'],
            'is_published' => (bool) $validated['is_published'],
            'is_main_header_menu' => (bool) $validated['is_main_header_menu'],
        ]);

        if ($request->header('X-Inertia')) {
            $menu->load(['allItems' => fn ($q) => $q->orderBy('order')]);

            return Inertia::render('admin/menus/edit', [
                'menu' => [
                    'id' => $menu->id,
                    'name' => $menu->name,
                    'is_published' => $menu->is_published,
                    'is_main_header_menu' => $menu->is_main_header_menu,
                    'items' => $menu->allItems->map(fn ($i) => [
                        'id' => $i->id,
                        'title' => $i->title,
                        'url' => $i->url,
                        'parent_id' => $i->parent_id,
                        'target' => $i->target,
                        'order' => $i->order,
                    ])->values()->all(),
                    'parentOptions' => $menu->allItems->map(fn ($i) => ['id' => $i->id, 'title' => $i->title])->values()->all(),
                ],
                'flash' => ['success' => 'Menu updated successfully.'],
            ]);
        }

        return to_route('admin.menus.edit', $menu)
            ->with('success', 'Menu updated successfully.');
    }

    public function destroy(Menu $menu): RedirectResponse
    {
        $this->authorize('delete', $menu);

        $menu->delete();

        return to_route('admin.menus.index')
            ->with('success', 'Menu deleted successfully.');
    }
}
