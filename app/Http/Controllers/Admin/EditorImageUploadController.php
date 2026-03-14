<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ImpactStory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EditorImageUploadController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $this->authorize('create', ImpactStory::class);

        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp'],
        ]);

        $path = $request->file('image')->store('editor-images', 'public');

        return response()->json([
            'url' => Storage::disk('public')->url($path),
        ]);
    }
}
