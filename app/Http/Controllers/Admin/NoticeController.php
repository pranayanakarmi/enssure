<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreNoticeRequest;
use App\Http\Requests\Admin\UpdateNoticeRequest;
use App\Models\Notice;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class NoticeController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Notice::class);

        $notices = Notice::orderByDesc('published_at')
            ->get()
            ->map(fn (Notice $n) => [
                'id' => $n->id,
                'title' => $n->title,
                'slug' => $n->slug,
                'notice_type' => $n->notice_type,
                'deadline_date' => $n->deadline_date?->toDateString(),
                'is_featured' => $n->is_featured,
                'published_at' => $n->published_at?->toISOString(),
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
        Notice::create($request->validated());

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
                'notice_type' => $notice->notice_type,
                'content' => $notice->content,
                'attachment' => $notice->attachment,
                'deadline_date' => $notice->deadline_date?->toDateString(),
                'is_featured' => $notice->is_featured,
                'published_at' => $notice->published_at?->toISOString(),
            ],
        ]);
    }

    public function update(UpdateNoticeRequest $request, Notice $notice): RedirectResponse
    {
        $notice->update($request->validated());

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
