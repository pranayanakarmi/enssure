<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCourseRequest;
use App\Http\Requests\Admin\UpdateCourseRequest;
use App\Models\Course;
use App\Models\TrainingProgram;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Course::class);

        $courses = Course::with('trainingProgram')
            ->orderBy('name')
            ->get()
            ->map(fn (Course $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'course_code' => $c->course_code,
                'duration' => $c->duration,
                'training_program_id' => $c->training_program_id,
                'training_program' => $c->trainingProgram ? ['id' => $c->trainingProgram->id, 'name' => $c->trainingProgram->name] : null,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/courses/index', [
            'courses' => $courses,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Course::class);

        $trainingPrograms = TrainingProgram::orderBy('name')->get(['id', 'name']);

        return Inertia::render('admin/courses/create', [
            'trainingPrograms' => $trainingPrograms,
        ]);
    }

    public function store(StoreCourseRequest $request): RedirectResponse
    {
        Course::create($request->validated());

        return to_route('admin.courses.index')
            ->with('success', 'Course created successfully.');
    }

    public function edit(Course $course): Response
    {
        $this->authorize('update', $course);

        $c = $course;
        $trainingPrograms = TrainingProgram::orderBy('name')->get(['id', 'name']);

        return Inertia::render('admin/courses/edit', [
            'course' => [
                'id' => $c->id,
                'training_program_id' => $c->training_program_id,
                'name' => $c->name,
                'description' => $c->description,
                'course_code' => $c->course_code,
                'duration' => $c->duration,
                'prerequisites' => $c->prerequisites,
                'syllabus_file' => $c->syllabus_file,
                'guideline_file' => $c->guideline_file,
            ],
            'trainingPrograms' => $trainingPrograms,
        ]);
    }

    public function update(UpdateCourseRequest $request, Course $course): RedirectResponse
    {
        $course->update($request->validated());

        return to_route('admin.courses.index')
            ->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course): RedirectResponse
    {
        $this->authorize('delete', $course);

        $course->delete();

        return to_route('admin.courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}
