<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTrainingBatchRequest;
use App\Http\Requests\Admin\UpdateTrainingBatchRequest;
use App\Models\TrainingBatch;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TrainingBatchController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', TrainingBatch::class);

        $batches = TrainingBatch::orderByDesc('start_date')
            ->get()
            ->map(fn (TrainingBatch $b) => [
                'id' => $b->id,
                'batch_name' => $b->batch_name,
                'batch_code' => $b->batch_code,
                'start_date' => $b->start_date?->toDateString(),
                'end_date' => $b->end_date?->toDateString(),
                'training_center' => $b->training_center,
                'status' => $b->status,
                'max_capacity' => $b->max_capacity,
                'current_enrollment' => $b->current_enrollment,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/training-batches/index', [
            'trainingBatches' => $batches,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', TrainingBatch::class);

        return Inertia::render('admin/training-batches/create');
    }

    public function store(StoreTrainingBatchRequest $request): RedirectResponse
    {
        TrainingBatch::create($request->validated());

        return to_route('admin.training_batches.index')
            ->with('success', 'Training batch created successfully.');
    }

    public function edit(TrainingBatch $training_batch): Response
    {
        $this->authorize('update', $training_batch);

        $b = $training_batch;

        return Inertia::render('admin/training-batches/edit', [
            'trainingBatch' => [
                'id' => $b->id,
                'batch_name' => $b->batch_name,
                'batch_code' => $b->batch_code,
                'start_date' => $b->start_date?->toDateString(),
                'end_date' => $b->end_date?->toDateString(),
                'training_center' => $b->training_center,
                'instructor_name' => $b->instructor_name,
                'max_capacity' => $b->max_capacity,
                'current_enrollment' => $b->current_enrollment,
                'status' => $b->status,
                'schedule_details' => $b->schedule_details,
            ],
        ]);
    }

    public function update(UpdateTrainingBatchRequest $request, TrainingBatch $training_batch): RedirectResponse
    {
        $training_batch->update($request->validated());

        return to_route('admin.training_batches.index')
            ->with('success', 'Training batch updated successfully.');
    }

    public function destroy(TrainingBatch $training_batch): RedirectResponse
    {
        $this->authorize('delete', $training_batch);

        $training_batch->delete();

        return to_route('admin.training_batches.index')
            ->with('success', 'Training batch deleted successfully.');
    }
}
