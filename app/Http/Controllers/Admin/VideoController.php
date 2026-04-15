<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::query()->orderByDesc('is_hero')->orderBy('order')->get();

        return Inertia::render('admin/videos/index', ['videos' => $videos]);
    }

    public function create()
    {
        return Inertia::render('admin/videos/create');
    }

    public function store(Request $request)
    {
        $request->merge([
            'is_active' => $request->boolean('is_active'),
            'is_hero' => $request->boolean('is_hero'),
        ]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'video_url' => 'required|url',
            'thumbnail' => 'nullable|image|max:2048',
            'date' => 'nullable|date',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'is_hero' => 'boolean',
        ]);

        if (($validated['is_hero'] ?? false) === true) {
            $validated['is_active'] = true;
            Video::query()->update(['is_hero' => false]);
        }

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('video-thumbnails', 'public');
            $validated['thumbnail'] = Storage::disk('public')->url($path);
        } else {
            $validated['thumbnail'] = null;
        }

        Video::create($validated);

        return redirect()->route('admin.videos.index')->with('success', 'Video created.');
    }

    public function edit(Video $video)
    {
        return Inertia::render('admin/videos/edit', ['video' => $video]);
    }

    public function update(Request $request, Video $video)
    {
        $request->merge([
            'is_active' => $request->boolean('is_active'),
            'is_hero' => $request->boolean('is_hero'),
        ]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'video_url' => 'required|url',
            'thumbnail' => 'nullable|image|max:2048',
            'date' => 'nullable|date',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'is_hero' => 'boolean',
        ]);

        if (($validated['is_hero'] ?? false) === true) {
            $validated['is_active'] = true;
            Video::query()->whereKeyNot($video->id)->update(['is_hero' => false]);
        }

        if (($validated['is_active'] ?? $video->is_active) === false) {
            $validated['is_hero'] = false;
        }

        if ($request->hasFile('thumbnail')) {
            if ($video->thumbnail) {
                $oldPath = str_replace(Storage::disk('public')->url(''), '', $video->thumbnail);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('thumbnail')->store('video-thumbnails', 'public');
            $validated['thumbnail'] = Storage::disk('public')->url($path);
        } else {
            unset($validated['thumbnail']);
        }

        $video->update($validated);

        return redirect()->route('admin.videos.index')->with('success', 'Video updated.');
    }

    public function destroy(Video $video)
    {
        if ($video->thumbnail) {
            $path = str_replace(Storage::disk('public')->url(''), '', $video->thumbnail);
            Storage::disk('public')->delete($path);
        }
        $video->delete();

        return redirect()->route('admin.videos.index')->with('success', 'Video deleted.');
    }
}
