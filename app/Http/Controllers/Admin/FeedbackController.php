<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\RedirectResponse;
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
            ])
            ->values()
            ->all();

        return Inertia::render('admin/feedback/index', [
            'feedback' => $feedback,
        ]);
    }

    public function show(Feedback $feedback): Response
    {
        $this->authorize('view', $feedback);

        $f = $feedback;

        return Inertia::render('admin/feedback/show', [
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

    public function destroy(Feedback $feedback): RedirectResponse
    {
        $this->authorize('delete', $feedback);

        $feedback->delete();

        return to_route('admin.feedback.index')
            ->with('success', 'Feedback deleted successfully.');
    }
}
