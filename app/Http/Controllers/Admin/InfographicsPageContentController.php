<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateInfographicsPageContentRequest;
use App\Models\InfographicsPageContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class InfographicsPageContentController extends Controller
{
    public function edit(): Response
    {
        $content = InfographicsPageContent::first()
            ?? InfographicsPageContent::create([
                'title' => 'Infographics',
                'banner_image' => null,
            ]);

        $this->authorize('update', $content);

        return Inertia::render('admin/infographics-page/content_edit', [
            'infographicsPageContent' => [
                'id' => $content->id,
                'title' => $content->title,
                'banner_image_url' => $content->banner_image
                    ? Storage::disk('public')->url($content->banner_image)
                    : null,
            ],
        ]);
    }

    public function update(UpdateInfographicsPageContentRequest $request): RedirectResponse
    {
        $content = InfographicsPageContent::first();

        if (! $content) {
            $data = $request->safe()->only(['title']);
            if ($request->hasFile('banner_image')) {
                $data['banner_image'] = $request->file('banner_image')->store('infographics-page', 'public');
            }
            $content = InfographicsPageContent::create($data);
            $this->authorize('update', $content);

            return back()->with('success', 'Infographics page content created successfully.');
        }

        $this->authorize('update', $content);

        $data = $request->validated();

        if ($request->boolean('remove_banner_image') && $content->banner_image) {
            Storage::disk('public')->delete($content->banner_image);
            $data['banner_image'] = null;
        } elseif ($request->hasFile('banner_image')) {
            if ($content->banner_image) {
                Storage::disk('public')->delete($content->banner_image);
            }
            $data['banner_image'] = $request->file('banner_image')->store('infographics-page', 'public');
        } else {
            unset($data['banner_image']);
        }

        unset($data['remove_banner_image']);
        $content->update($data);

        return back()->with('success', 'Infographics page content updated successfully.');
    }
}
