<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePageRequest;
use App\Http\Requests\Admin\UpdatePageRequest;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Page::class);

        $pages = Page::with('parent:id,title')
            ->orderBy('title')
            ->get()
            ->map(fn (Page $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'parent_id' => $p->parent_id,
                'parent' => $p->parent?->title,
                'published_at' => $p->published_at?->toISOString(),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/pages/index', [
            'pages' => $pages,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Page::class);

        $pages = Page::orderBy('title')->get(['id', 'title'])->map(fn ($p) => ['id' => $p->id, 'title' => $p->title])->values()->all();

        return Inertia::render('admin/pages/create', [
            'pages' => $pages,
        ]);
    }

    public function store(StorePageRequest $request): RedirectResponse
    {
        Page::create($request->validated());

        return to_route('admin.pages.index')
            ->with('success', 'Page created successfully.');
    }

    public function edit(Page $page): Response
    {
        $this->authorize('update', $page);

        $pages = Page::where('id', '!=', $page->id)->orderBy('title')->get(['id', 'title'])->map(fn ($p) => ['id' => $p->id, 'title' => $p->title])->values()->all();

        return Inertia::render('admin/pages/edit', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'content' => $page->content,
                'meta_title' => $page->meta_title,
                'meta_description' => $page->meta_description,
                'parent_id' => $page->parent_id,
                'published_at' => $page->published_at?->toISOString(),
            ],
            'pages' => $pages,
        ]);
    }

    public function update(UpdatePageRequest $request, Page $page): RedirectResponse
    {
        $page->update([
            ...$request->validated(),
            'updated_by' => $request->user()->id,
        ]);

        return to_route('admin.pages.index')
            ->with('success', 'Page updated successfully.');
    }

    public function destroy(Page $page): RedirectResponse
    {
        $this->authorize('delete', $page);

        $page->delete();

        return to_route('admin.pages.index')
            ->with('success', 'Page deleted successfully.');
    }
}
