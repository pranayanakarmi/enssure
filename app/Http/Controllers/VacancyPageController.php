<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class VacancyPageController extends Controller
{
    public function index(): Response
    {
        $vacancies = Vacancy::query()
            ->publishedForPublic()
            ->orderByDesc('published_at')
            ->get()
            ->map(fn (Vacancy $v) => [
                'id' => $v->id,
                'title' => $v->position_title,
                'slug' => $v->slug,
                'excerpt' => $v->job_description
                    ? Str::limit(strip_tags($v->job_description), 200)
                    : '',
                'date' => $v->published_at?->format('j F Y') ?? '',
                'location' => $v->location,
                'job_type' => $v->job_type,
                'application_deadline' => $v->application_deadline?->format('j F Y'),
            ])
            ->values()
            ->all();

        return Inertia::render('Vacancy', [
            'vacancies' => $vacancies,
        ]);
    }

    public function show(Vacancy $vacancy): Response
    {
        if (! Vacancy::query()->publishedForPublic()->whereKey($vacancy->id)->exists()) {
            abort(404);
        }
        $vacancy->load('relatedDocuments');

        return Inertia::render('VacancyDetail', [
            'vacancy' => $this->vacancyForDetailPage($vacancy),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function vacancyForDetailPage(Vacancy $v): array
    {
        return [
            'id' => $v->id,
            'title' => $v->position_title,
            'slug' => $v->slug,
            'job_description_html' => $this->sanitizeVacancyHtml($v->job_description),
            'requirements_html' => $this->sanitizeVacancyHtml($v->requirements),
            'application_instructions_html' => $this->sanitizeVacancyHtml($v->application_instructions),
            'location' => $v->location,
            'job_type' => $v->job_type,
            'number_of_positions' => $v->number_of_positions,
            'published_at' => $v->published_at?->format('j F Y'),
            'application_deadline' => $v->application_deadline?->format('j F Y'),
            'tor_file_url' => $this->publicFileUrl($v->tor_file),
            'related_documents' => $v->relatedDocuments->map(fn ($document) => [
                'id' => $document->id,
                'file_name' => $document->file_name,
                'file_url' => $this->publicFileUrl($document->file_path),
            ])->values()->all(),
        ];
    }

    private function sanitizeVacancyHtml(?string $html): ?string
    {
        if ($html === null || $html === '') {
            return null;
        }

        $allowed = '<p><br><strong><em><u><s><a><ul><ol><li><h2><h3><blockquote><pre><code><hr><img><table><thead><tbody><tfoot><tr><th><td><colgroup><col><span>';

        return strip_tags($html, $allowed);
    }

    private function publicFileUrl(?string $path): ?string
    {
        if ($path === null || $path === '') {
            return null;
        }

        if (str_starts_with($path, 'http')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
