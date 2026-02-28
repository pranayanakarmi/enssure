<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDocumentRequest;
use App\Http\Requests\Admin\UpdateDocumentRequest;
use App\Models\Document;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Document::class);

        $documents = Document::orderBy('title')
            ->get()
            ->map(fn (Document $d) => [
                'id' => $d->id,
                'title' => $d->title,
                'document_type' => $d->document_type,
                'file_path' => $d->file_path,
                'file_extension' => $d->file_extension,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/documents/index', [
            'documents' => $documents,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Document::class);

        return Inertia::render('admin/documents/create');
    }

    public function store(StoreDocumentRequest $request): RedirectResponse
    {
        Document::create($request->validated());

        return to_route('admin.documents.index')
            ->with('success', 'Document created successfully.');
    }

    public function edit(Document $document): Response
    {
        $this->authorize('update', $document);

        $d = $document;

        return Inertia::render('admin/documents/edit', [
            'document' => [
                'id' => $d->id,
                'title' => $d->title,
                'description' => $d->description,
                'document_type' => $d->document_type,
                'file_path' => $d->file_path,
                'file_size' => $d->file_size,
                'file_extension' => $d->file_extension,
            ],
        ]);
    }

    public function update(UpdateDocumentRequest $request, Document $document): RedirectResponse
    {
        $document->update($request->validated());

        return to_route('admin.documents.index')
            ->with('success', 'Document updated successfully.');
    }

    public function destroy(Document $document): RedirectResponse
    {
        $this->authorize('delete', $document);

        $document->delete();

        return to_route('admin.documents.index')
            ->with('success', 'Document deleted successfully.');
    }
}
