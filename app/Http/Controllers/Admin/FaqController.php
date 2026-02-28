<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFaqRequest;
use App\Http\Requests\Admin\UpdateFaqRequest;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Faq::class);

        $faqs = Faq::orderBy('order')
            ->orderBy('question')
            ->get()
            ->map(fn (Faq $f) => [
                'id' => $f->id,
                'question' => $f->question,
                'category' => $f->category,
                'order' => $f->order,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/faqs/index', [
            'faqs' => $faqs,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Faq::class);

        return Inertia::render('admin/faqs/create');
    }

    public function store(StoreFaqRequest $request): RedirectResponse
    {
        Faq::create($request->validated());

        return to_route('admin.faqs.index')
            ->with('success', 'FAQ created successfully.');
    }

    public function edit(Faq $faq): Response
    {
        $this->authorize('update', $faq);

        $f = $faq;

        return Inertia::render('admin/faqs/edit', [
            'faq' => [
                'id' => $f->id,
                'question' => $f->question,
                'answer' => $f->answer,
                'category' => $f->category,
                'views_count' => $f->views_count,
                'order' => $f->order,
            ],
        ]);
    }

    public function update(UpdateFaqRequest $request, Faq $faq): RedirectResponse
    {
        $faq->update($request->validated());

        return to_route('admin.faqs.index')
            ->with('success', 'FAQ updated successfully.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $this->authorize('delete', $faq);

        $faq->delete();

        return to_route('admin.faqs.index')
            ->with('success', 'FAQ deleted successfully.');
    }
}
