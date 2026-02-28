<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBatchEnrollmentRequest;
use App\Http\Requests\Admin\UpdateBatchEnrollmentRequest;
use App\Models\BatchEnrollment;
use App\Models\Beneficiary;
use App\Models\TrainingBatch;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BatchEnrollmentController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', BatchEnrollment::class);

        $enrollments = BatchEnrollment::with(['batch', 'beneficiary'])
            ->orderByDesc('enrollment_date')
            ->get()
            ->map(fn (BatchEnrollment $e) => [
                'id' => $e->id,
                'batch_id' => $e->batch_id,
                'beneficiary_id' => $e->beneficiary_id,
                'enrollment_date' => $e->enrollment_date?->toDateString(),
                'status' => $e->status,
                'completion_percentage' => $e->completion_percentage,
                'batch' => $e->batch ? ['id' => $e->batch->id, 'batch_name' => $e->batch->batch_name] : null,
                'beneficiary' => $e->beneficiary ? ['id' => $e->beneficiary->id, 'full_name' => $e->beneficiary->full_name] : null,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/batch-enrollments/index', [
            'batchEnrollments' => $enrollments,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', BatchEnrollment::class);

        $batches = TrainingBatch::orderBy('batch_name')->get(['id', 'batch_name', 'batch_code']);
        $beneficiaries = Beneficiary::orderBy('full_name')->get(['id', 'full_name']);

        return Inertia::render('admin/batch-enrollments/create', [
            'batches' => $batches,
            'beneficiaries' => $beneficiaries,
        ]);
    }

    public function store(StoreBatchEnrollmentRequest $request): RedirectResponse
    {
        BatchEnrollment::create($request->validated());

        return to_route('admin.batch_enrollments.index')
            ->with('success', 'Batch enrollment created successfully.');
    }

    public function edit(BatchEnrollment $batch_enrollment): Response
    {
        $this->authorize('update', $batch_enrollment);

        $e = $batch_enrollment;
        $batches = TrainingBatch::orderBy('batch_name')->get(['id', 'batch_name', 'batch_code']);
        $beneficiaries = Beneficiary::orderBy('full_name')->get(['id', 'full_name']);

        return Inertia::render('admin/batch-enrollments/edit', [
            'batchEnrollment' => [
                'id' => $e->id,
                'batch_id' => $e->batch_id,
                'beneficiary_id' => $e->beneficiary_id,
                'enrollment_date' => $e->enrollment_date?->toDateString(),
                'status' => $e->status,
                'completion_percentage' => $e->completion_percentage,
                'final_grade' => $e->final_grade,
                'remarks' => $e->remarks,
            ],
            'batches' => $batches,
            'beneficiaries' => $beneficiaries,
        ]);
    }

    public function update(UpdateBatchEnrollmentRequest $request, BatchEnrollment $batch_enrollment): RedirectResponse
    {
        $batch_enrollment->update($request->validated());

        return to_route('admin.batch_enrollments.index')
            ->with('success', 'Batch enrollment updated successfully.');
    }

    public function destroy(BatchEnrollment $batch_enrollment): RedirectResponse
    {
        $this->authorize('delete', $batch_enrollment);

        $batch_enrollment->delete();

        return to_route('admin.batch_enrollments.index')
            ->with('success', 'Batch enrollment deleted successfully.');
    }
}
