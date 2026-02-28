<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTrainingProgramRequest;
use App\Http\Requests\Admin\UpdateTrainingProgramRequest;
use App\Models\TrainingProgram;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TrainingProgramController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', TrainingProgram::class);

        $trainingPrograms = TrainingProgram::orderBy('name')
            ->get()
            ->map(fn (TrainingProgram $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'program_type' => $p->program_type,
                'duration' => $p->duration,
                'level' => $p->level,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/training-programs/index', [
            'trainingPrograms' => $trainingPrograms,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', TrainingProgram::class);

        return Inertia::render('admin/training-programs/create');
    }

    public function store(StoreTrainingProgramRequest $request): RedirectResponse
    {
        TrainingProgram::create($request->validated());

        return to_route('admin.training_programs.index')
            ->with('success', 'Training program created successfully.');
    }

    public function edit(TrainingProgram $training_program): Response
    {
        $this->authorize('update', $training_program);

        $p = $training_program;

        return Inertia::render('admin/training-programs/edit', [
            'trainingProgram' => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'program_type' => $p->program_type,
                'description' => $p->description,
                'duration' => $p->duration,
                'level' => $p->level,
            ],
        ]);
    }

    public function update(UpdateTrainingProgramRequest $request, TrainingProgram $training_program): RedirectResponse
    {
        $training_program->update($request->validated());

        return to_route('admin.training_programs.index')
            ->with('success', 'Training program updated successfully.');
    }

    public function destroy(TrainingProgram $training_program): RedirectResponse
    {
        $this->authorize('delete', $training_program);

        $training_program->delete();

        return to_route('admin.training_programs.index')
            ->with('success', 'Training program deleted successfully.');
    }
}
