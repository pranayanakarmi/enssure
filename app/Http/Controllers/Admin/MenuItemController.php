<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMenuItemRequest;
use App\Http\Requests\Admin\UpdateMenuItemRequest;
use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MenuItemController extends Controller
{
    public function store(StoreMenuItemRequest $request, Menu $menu): RedirectResponse
    {
        $menu->allItems()->create($request->validated());

        return back()->with('success', 'Menu item added.');
    }

    public function edit(MenuItem $menu_item): Response
    {
        $this->authorize('update', $menu_item);

        $menu_item->load('menu');
        $siblings = MenuItem::where('menu_id', $menu_item->menu_id)
            ->where('id', '!=', $menu_item->id)
            ->orderBy('order')
            ->get(['id', 'title', 'order'])
            ->map(fn ($i) => ['id' => $i->id, 'title' => $i->title, 'order' => $i->order])
            ->values()
            ->all();

        return Inertia::render('admin/menus/menu-items/edit', [
            'menuItem' => [
                'id' => $menu_item->id,
                'menu_id' => $menu_item->menu_id,
                'title' => $menu_item->title,
                'url' => $menu_item->url,
                'parent_id' => $menu_item->parent_id,
                'target' => $menu_item->target ?? '_self',
                'order' => $menu_item->order,
            ],
            'menu' => [
                'id' => $menu_item->menu->id,
                'name' => $menu_item->menu->name,
            ],
            'parentOptions' => $siblings,
        ]);
    }

    public function update(UpdateMenuItemRequest $request, MenuItem $menu_item): RedirectResponse
    {
        $menu_item->update($request->validated());

        return redirect()->route('admin.menus.edit', $menu_item->menu_id)
            ->with('success', 'Menu item updated.');
    }

    public function destroy(MenuItem $menu_item): RedirectResponse
    {
        $this->authorize('delete', $menu_item);

        $menu_id = $menu_item->menu_id;
        $menu_item->delete();

        return redirect()->route('admin.menus.edit', $menu_id)
            ->with('success', 'Menu item deleted.');
    }
}
