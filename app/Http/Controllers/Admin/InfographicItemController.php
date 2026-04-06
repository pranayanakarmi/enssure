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

class InfographicItemController extends Controller
{
    public function store(StoreInfographicItemRequest $request, Infographic $infographic): RedirectResponse
    {
        $data = $request->validated();
        $data['image'] = $request->file('image')->store('infographic-items', 'public');
        $data['sort_order'] = $request->input('sort_order', $infographic->items->count());
        $infographic->items()->create($data);
        return back()->with('success', 'Item added.');
    }

    public function update(UpdateInfographicItemRequest $request, $id): RedirectResponse
    {
        $item = InfographicItem::findOrFail($id);
        $data = $request->validated();
        if ($request->hasFile('image')) {
            if ($item->image) Storage::disk('public')->delete($item->image);
            $data['image'] = $request->file('image')->store('infographic-items', 'public');
        }
        $item->update($data);
        return back()->with('success', 'Item updated.');
    }

    public function destroy($id): RedirectResponse
    {
        $item = InfographicItem::findOrFail($id);
        Storage::disk('public')->delete($item->image);
        $item->delete();
        return back()->with('success', 'Item deleted.');
    }

    public function reorder(ReorderInfographicItemsRequest $request, Infographic $infographic): RedirectResponse
    {
        DB::transaction(function () use ($request, $infographic) {
            foreach ($request->item_ids as $index => $id) {
                InfographicItem::where('infographic_id', $infographic->id)
                    ->whereKey($id)
                    ->update(['sort_order' => $index]);
            }
        });
        return back()->with('success', 'Items reordered.');
    }
}
