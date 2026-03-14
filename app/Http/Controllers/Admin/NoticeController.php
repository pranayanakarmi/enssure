<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreNoticeRequest;
use App\Http\Requests\Admin\UpdateNoticeRequest;
use App\Models\Notice;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NoticeController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Notice::class);

        $notices = Notice::orderByDesc('created_at')
            ->get()
            ->map(fn (Notice $n) => [
                'id' => $n->id,
                'title' => $n->title,
                'slug' => $n->slug,
                'image_url' => $n->image ? Storage::disk('public')->url($n->image) : null,
                'is_featured' => $n->is_featured,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/notices/index', [
            'notices' => $notices,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Notice::class);

        return Inertia::render('admin/notices/create');
    }

    public function store(StoreNoticeRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($request->title);
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('notices', 'public');
        } else {
            unset($data['image']);
        }

        Notice::create($data);

        return to_route('admin.notices.index')
            ->with('success', 'Notice created successfully.');
    }

    public function edit(Notice $notice): Response
    {
        $this->authorize('update', $notice);

        return Inertia::render('admin/notices/edit', [
            'notice' => [
                'id' => $notice->id,
                'title' => $notice->title,
                'slug' => $notice->slug,
                'content' => $notice->content,
                'image' => $notice->image,
                'image_url' => $notice->image ? Storage::disk('public')->url($notice->image) : null,
                'attachment' => $notice->attachment,
                'is_featured' => $notice->is_featured,
            ],
        ]);
    }

    public function update(UpdateNoticeRequest $request, Notice $notice): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($request->title);
        }

        if ($request->boolean('remove_image') && $notice->image) {
            Storage::disk('public')->delete($notice->image);
            $data['image'] = null;
        } elseif ($request->hasFile('image')) {
            if ($notice->image) {
                Storage::disk('public')->delete($notice->image);
            }
            $data['image'] = $request->file('image')->store('notices', 'public');
        } else {
            unset($data['image']);
        }
        unset($data['remove_image']);

        $notice->update($data);

        return to_route('admin.notices.index')
            ->with('success', 'Notice updated successfully.');
    }

    public function destroy(Notice $notice): RedirectResponse
    {
        $this->authorize('delete', $notice);

        $notice->delete();

        return to_route('admin.notices.index')
            ->with('success', 'Notice deleted successfully.');
    }
}
