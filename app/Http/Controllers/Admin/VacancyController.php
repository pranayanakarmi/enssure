<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreVacancyRequest;
use App\Http\Requests\Admin\UpdateVacancyRequest;
use App\Models\Vacancy;
use App\Models\VacancyRelatedDocument;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class VacancyController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Vacancy::class);

        $vacancies = Vacancy::orderByDesc('published_at')
            ->get()
            ->map(fn (Vacancy $v) => [
                'id' => $v->id,
                'position_title' => $v->position_title,
                'slug' => $v->slug,
                'location' => $v->location,
                'job_type' => $v->job_type,
                'status' => $v->status,
                'application_deadline' => $v->application_deadline?->toDateString(),
                'apply_url' => $v->apply_url,
                'published_at' => $v->published_at?->toISOString(),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/vacancies/index', [
            'vacancies' => $vacancies,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Vacancy::class);

        return Inertia::render('admin/vacancies/create');
    }

    public function store(StoreVacancyRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $relatedDocuments = $request->file('related_documents', []);
        unset($data['slug']);
        unset($data['related_documents']);
        $data['slug'] = Vacancy::generateUniqueSlug($data['position_title']);

        $vacancy = Vacancy::create($data);
        $this->storeRelatedDocuments($vacancy, $relatedDocuments);

        return to_route('admin.vacancies.index')
            ->with('success', 'Vacancy created successfully.');
    }

    public function edit(Vacancy $vacancy): Response
    {
        $this->authorize('update', $vacancy);
        $vacancy->load('relatedDocuments');

        return Inertia::render('admin/vacancies/edit', [
            'vacancy' => [
                'id' => $vacancy->id,
                'position_title' => $vacancy->position_title,
                'slug' => $vacancy->slug,
                'job_description' => $vacancy->job_description,
                'requirements' => $vacancy->requirements,
                'location' => $vacancy->location,
                'job_type' => $vacancy->job_type,
                'number_of_positions' => $vacancy->number_of_positions,
                'application_deadline' => $vacancy->application_deadline?->toDateString(),
                'apply_url' => $vacancy->apply_url,
                'application_instructions' => $vacancy->application_instructions,
                'tor_file' => $vacancy->tor_file,
                'status' => $vacancy->status,
                'published_at' => $vacancy->published_at?->toISOString(),
                'related_documents' => $vacancy->relatedDocuments->map(fn (VacancyRelatedDocument $document) => [
                    'id' => $document->id,
                    'file_name' => $document->file_name,
                    'file_extension' => $document->file_extension,
                    'file_size' => $document->file_size,
                    'file_url' => Storage::disk('public')->url($document->file_path),
                ])->values()->all(),
            ],
        ]);
    }

    public function update(UpdateVacancyRequest $request, Vacancy $vacancy): RedirectResponse
    {
        $data = $request->validated();
        $relatedDocuments = $request->file('related_documents', []);
        $removeRelatedDocumentIds = $request->validated('remove_related_document_ids', []);
        unset($data['slug']);
        unset($data['related_documents'], $data['remove_related_document_ids']);
        $data['slug'] = Vacancy::generateUniqueSlug($data['position_title'], $vacancy->id);

        $vacancy->update($data);
        $this->deleteRelatedDocuments($vacancy, $removeRelatedDocumentIds);
        $this->storeRelatedDocuments($vacancy, $relatedDocuments);

        return to_route('admin.vacancies.index')
            ->with('success', 'Vacancy updated successfully.');
    }

    public function destroy(Vacancy $vacancy): RedirectResponse
    {
        $this->authorize('delete', $vacancy);

        $vacancy->delete();

        return to_route('admin.vacancies.index')
            ->with('success', 'Vacancy deleted successfully.');
    }

    /**
     * @param  array<int, \Illuminate\Http\UploadedFile>  $relatedDocuments
     */
    private function storeRelatedDocuments(Vacancy $vacancy, array $relatedDocuments): void
    {
        if ($relatedDocuments === []) {
            return;
        }

        $nextOrder = (int) ($vacancy->relatedDocuments()->max('order') ?? -1) + 1;

        foreach ($relatedDocuments as $document) {
            $vacancy->relatedDocuments()->create([
                'file_path' => $document->store('vacancies/related-documents', 'public'),
                'file_name' => $document->getClientOriginalName(),
                'file_extension' => strtolower($document->getClientOriginalExtension()),
                'file_size' => $document->getSize(),
                'order' => $nextOrder,
            ]);
            $nextOrder++;
        }
    }

    /**
     * @param  array<int, int>  $removeRelatedDocumentIds
     */
    private function deleteRelatedDocuments(Vacancy $vacancy, array $removeRelatedDocumentIds): void
    {
        if ($removeRelatedDocumentIds === []) {
            return;
        }

        $documents = $vacancy->relatedDocuments()->whereIn('id', $removeRelatedDocumentIds)->get();

        foreach ($documents as $document) {
            Storage::disk('public')->delete($document->file_path);
            $document->delete();
        }
    }
}
