<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $reports = Document::query()
            ->whereRaw('LOWER(file_extension) = ?', ['pdf'])
            ->orderBy('title')
            ->get()
            ->map(fn (Document $d) => [
                'id' => $d->id,
                'title' => $d->title,
                'pdf_url' => Storage::disk('public')->url($d->file_path),
            ])
            ->values()
            ->all();

        $ids = array_column($reports, 'id');
        $requestedId = $request->query('id');
        $selectedId = null;

        if ($requestedId !== null && $requestedId !== '') {
            $id = (int) $requestedId;
            if (in_array($id, $ids, true)) {
                $selectedId = $id;
            }
        }

        if ($selectedId === null && count($reports) > 0) {
            $selectedId = $reports[0]['id'];
        }

        return Inertia::render('Reports', [
            'reports' => $reports,
            'selectedId' => $selectedId,
        ]);
    }

    public function show(Document $document): RedirectResponse
    {
        if (strtolower((string) $document->file_extension) !== 'pdf') {
            abort(404);
        }

        return redirect()->route('reports.index', ['id' => $document->id]);
    }
}
