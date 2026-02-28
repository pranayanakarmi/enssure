<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePublicationRequest;
use App\Http\Requests\Admin\UpdatePublicationRequest;
use App\Models\Publication;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PublicationController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Publication::class);

        $publications = Publication::orderByDesc('publication_date')
            ->get()
            ->map(fn (Publication $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'authors' => $p->authors,
                'publication_type' => $p->publication_type,
                'publication_date' => $p->publication_date?->toDateString(),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/publications/index', [
            'publications' => $publications,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Publication::class);

        return Inertia::render('admin/publications/create');
    }

    public function store(StorePublicationRequest $request): RedirectResponse
    {
        Publication::create($request->validated());

        return to_route('admin.publications.index')
            ->with('success', 'Publication created successfully.');
    }

    public function edit(Publication $publication): Response
    {
        $this->authorize('update', $publication);

        $p = $publication;

        return Inertia::render('admin/publications/edit', [
            'publication' => [
                'id' => $p->id,
                'title' => $p->title,
                'authors' => $p->authors,
                'publication_type' => $p->publication_type,
                'abstract' => $p->abstract,
                'content' => $p->content,
                'publication_date' => $p->publication_date?->toDateString(),
                'publisher' => $p->publisher,
                'isbn' => $p->isbn,
                'doi' => $p->doi,
                'file_path' => $p->file_path,
                'cover_image' => $p->cover_image,
            ],
        ]);
    }

    public function update(UpdatePublicationRequest $request, Publication $publication): RedirectResponse
    {
        $publication->update($request->validated());

        return to_route('admin.publications.index')
            ->with('success', 'Publication updated successfully.');
    }

    public function destroy(Publication $publication): RedirectResponse
    {
        $this->authorize('delete', $publication);

        $publication->delete();

        return to_route('admin.publications.index')
            ->with('success', 'Publication deleted successfully.');
    }
}
