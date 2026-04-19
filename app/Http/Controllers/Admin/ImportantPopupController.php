<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreImportantPopupRequest;
use App\Http\Requests\Admin\UpdateImportantPopupRequest;
use App\Models\ImportantPopup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ImportantPopupController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', ImportantPopup::class);

        $importantPopups = ImportantPopup::query()
            ->latest('updated_at')
            ->latest('id')
            ->get()
            ->map(fn (ImportantPopup $popup) => [
                'id' => $popup->id,
                'title' => $popup->title,
                'cta_text' => $popup->cta_text,
                'cta_url' => $popup->cta_url,
                'video_url' => $popup->video_url,
                'image_url' => $popup->image ? asset('storage/'.$popup->image) : null,
                'is_active' => $popup->is_active,
                'updated_at' => optional($popup->updated_at)?->format('M d, Y h:i A'),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/important_popups/index', [
            'importantPopups' => $importantPopups,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', ImportantPopup::class);

        return Inertia::render('admin/important_popups/create');
    }

    public function store(StoreImportantPopupRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if (! empty($data['is_active'])) {
            ImportantPopup::query()->update(['is_active' => false]);
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('important-popup', 'public');
        }


        ImportantPopup::create($data);

        return to_route('admin.important_popups.index')
            ->with('success', 'Important popup created successfully.');
    }

    public function edit(ImportantPopup $important_popup): Response
    {
        $this->authorize('update', $important_popup);

        return Inertia::render('admin/important_popups/edit', [
            'importantPopup' => [
                'id' => $important_popup->id,
                'title' => $important_popup->title,
                'description' => $important_popup->description,
                'image_url' => $important_popup->image ? asset('storage/'.$important_popup->image) : null,
                'cta_text' => $important_popup->cta_text,
                'cta_url' => $important_popup->cta_url,
                'video_url' => $important_popup->video_url,
                'is_active' => $important_popup->is_active,
            ],
        ]);
    }

    public function update(UpdateImportantPopupRequest $request, ImportantPopup $important_popup): RedirectResponse
    {
        $this->authorize('update', $important_popup);

        $data = $request->validated();

        if (! empty($data['is_active'])) {
            ImportantPopup::query()
                ->whereKeyNot($important_popup->id)
                ->update(['is_active' => false]);
        }

        if ($request->boolean('remove_image') && $important_popup->image) {
            Storage::disk('public')->delete($important_popup->image);
            $data['image'] = null;
        } elseif ($request->hasFile('image')) {
            if ($important_popup->image) {
                Storage::disk('public')->delete($important_popup->image);
            }

            $data['image'] = $request->file('image')->store('important-popup', 'public');
        } else {
            unset($data['image']);
        }

        unset($data['remove_image']);

        $important_popup->update($data);

        return to_route('admin.important_popups.index')
            ->with('success', 'Important popup updated successfully.');
    }

    public function destroy(ImportantPopup $important_popup): RedirectResponse
    {
        $this->authorize('delete', $important_popup);

        if ($important_popup->image) {
            Storage::disk('public')->delete($important_popup->image);
        }

        $important_popup->delete();

        return to_route('admin.important_popups.index')
            ->with('success', 'Important popup deleted successfully.');
    }
}
