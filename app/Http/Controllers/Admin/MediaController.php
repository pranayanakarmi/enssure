<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMediaRequest;
use App\Http\Requests\Admin\UpdateMediaRequest;
use App\Models\Media;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Media::class);

        $media = Media::orderByDesc('id')
            ->get()
            ->map(fn (Media $m) => [
                'id' => $m->id,
                'file_name' => $m->file_name,
                'path' => $m->path,
                'file_type' => $m->file_type,
                'title' => $m->title,
                'folder' => $m->folder,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/media/index', [
            'media' => $media,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Media::class);

        return Inertia::render('admin/media/create');
    }

    public function store(StoreMediaRequest $request): RedirectResponse
    {
        Media::create($request->validated());

        return to_route('admin.media.index')
            ->with('success', 'Media created successfully.');
    }

    public function edit(Media $medium): Response
    {
        $this->authorize('update', $medium);

        $m = $medium;

        return Inertia::render('admin/media/edit', [
            'medium' => [
                'id' => $m->id,
                'file_name' => $m->file_name,
                'path' => $m->path,
                'file_type' => $m->file_type,
                'mime_type' => $m->mime_type,
                'file_size' => $m->file_size,
                'alt_text' => $m->alt_text,
                'title' => $m->title,
                'description' => $m->description,
                'width' => $m->width,
                'height' => $m->height,
                'folder' => $m->folder,
            ],
        ]);
    }

    public function update(UpdateMediaRequest $request, Media $medium): RedirectResponse
    {
        $medium->update($request->validated());

        return to_route('admin.media.index')
            ->with('success', 'Media updated successfully.');
    }

    public function destroy(Media $medium): RedirectResponse
    {
        $this->authorize('delete', $medium);

        $medium->delete();

        return to_route('admin.media.index')
            ->with('success', 'Media deleted successfully.');
    }
}
