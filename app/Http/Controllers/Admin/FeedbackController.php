<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateFeedbackRequest;
use App\Models\Feedback;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class FeedbackController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Feedback::class);

        $feedback = Feedback::orderByDesc('id')
            ->get()
            ->map(fn (Feedback $f) => [
                'id' => $f->id,
                'feedback_type' => $f->feedback_type,
                'name' => $f->name,
                'email' => $f->email,
                'feedback_text' => $f->feedback_text ? Str::limit($f->feedback_text, 80) : null,
                'is_public' => $f->is_public,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/feedback/index', [
            'feedback' => $feedback,
        ]);
    }

    public function edit(Feedback $feedback): Response
    {
        $this->authorize('update', $feedback);

        $f = $feedback;

        return Inertia::render('admin/feedback/edit', [
            'feedback' => [
                'id' => $f->id,
                'feedback_type' => $f->feedback_type,
                'name' => $f->name,
                'email' => $f->email,
                'feedback_text' => $f->feedback_text,
                'is_public' => $f->is_public,
            ],
        ]);
    }

    public function update(UpdateFeedbackRequest $request, Feedback $feedback): RedirectResponse
    {
        $feedback->update($request->validated());

        return to_route('admin.feedback.index')
            ->with('success', 'Feedback updated successfully.');
    }

    public function destroy(Feedback $feedback): RedirectResponse
    {
        $this->authorize('delete', $feedback);

        $feedback->delete();

        return to_route('admin.feedback.index')
            ->with('success', 'Feedback deleted successfully.');
    }
}
