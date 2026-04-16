<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DocumentType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DocumentTypeController extends Controller
{
    public function index(): Response
    {
        $types = DocumentType::orderBy('name')->get();
        return Inertia::render('admin/document_types/index', [
            'types' => $types,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/document_types/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:document_types,slug',
        ]);
        DocumentType::create($data);
        return redirect()->route('admin.document_types.index')->with('success', 'Document type created.');
    }

    public function edit(DocumentType $document_type): Response
    {
        return Inertia::render('admin/document_types/edit', [
            'type' => $document_type,
        ]);
    }

    public function update(Request $request, DocumentType $document_type): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:document_types,slug,' . $document_type->id,
        ]);
        $document_type->update($data);
        return redirect()->route('admin.document_types.index')->with('success', 'Document type updated.');
    }

    public function destroy(DocumentType $document_type): RedirectResponse
    {
        $document_type->delete();
        return redirect()->route('admin.document_types.index')->with('success', 'Document type deleted.');
    }
}
