<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReorderInfographicItemsRequest;
use App\Http\Requests\Admin\StoreInfographicItemRequest;
use App\Http\Requests\Admin\UpdateInfographicItemRequest;
use App\Models\Infographic;
use App\Models\InfographicItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class InfographicItemController extends Controller
{
    public function reorder(ReorderInfographicItemsRequest $request, Infographic $infographic): RedirectResponse
    {
        $itemIds = $request->validated('item_ids');

        DB::transaction(function () use ($infographic, $itemIds): void {
            foreach ($itemIds as $index => $itemId) {
                InfographicItem::query()
                    ->whereKey((int) $itemId)
                    ->where('infographic_id', $infographic->id)
                    ->update(['sort_order' => $index]);
            }
        });

        return back()->with('success', 'Infographic item order updated.');
    }

    public function store(StoreInfographicItemRequest $request, Infographic $infographic): RedirectResponse
    {
        $infographic->items()->create([
            'title' => $request->validated('title'),
            'sort_order' => (int) $request->input('sort_order', 0),
            'image' => $request->file('image')->store('infographics', 'public'),
        ]);

        return back()->with('success', 'Infographic item added.');
    }

    public function edit(InfographicItem $infographic_item): Response
    {
        $infographic = $infographic_item->infographic;
        $this->authorize('update', $infographic);

        return Inertia::render('admin/infographics/items/edit', [
            'infographic' => [
                'id' => $infographic->id,
                'slug' => $infographic->slug,
                'label' => $infographic->displayLabel(),
            ],
            'infographicItem' => [
                'id' => $infographic_item->id,
                'title' => $infographic_item->title,
                'sort_order' => $infographic_item->sort_order,
                'image_url' => Storage::disk('public')->url($infographic_item->image),
            ],
        ]);
    }

    public function update(UpdateInfographicItemRequest $request, InfographicItem $infographic_item): RedirectResponse
    {
        $infographic = $infographic_item->infographic;
        $this->authorize('update', $infographic);

        $data = [
            'title' => $request->validated('title'),
            'sort_order' => (int) $request->input('sort_order', $infographic_item->sort_order),
        ];

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($infographic_item->image);
            $data['image'] = $request->file('image')->store('infographics', 'public');
        }

        $infographic_item->update($data);

        return redirect()->route('admin.infographics.edit', $infographic)
            ->with('success', 'Infographic item updated.');
    }

    public function destroy(InfographicItem $infographic_item): RedirectResponse
    {
        $infographic = $infographic_item->infographic;
        $this->authorize('update', $infographic);

        Storage::disk('public')->delete($infographic_item->image);
        $infographic_item->delete();

        return redirect()->route('admin.infographics.edit', $infographic)
            ->with('success', 'Infographic item deleted.');
    }
}
