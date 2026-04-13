<?php

use App\Models\Course;
use App\Models\TrainingProgram;

test('programs index returns all programs with course counts', function () {
    $program = TrainingProgram::create([
        'name' => 'BSc Health Informatics',
        'slug' => 'bsc-health-informatics',
        'program_type' => 'Degree',
        'description' => 'A four-year undergraduate health informatics program.',
        'duration' => '4 Years',
        'level' => 'Undergraduate',
    ]);

    Course::create([
        'training_program_id' => $program->id,
        'name' => 'Introduction to Health Informatics',
        'course_code' => 'HI-101',
    ]);

    $response = $this->get(route('programs.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Programs')
        ->has('programs')
        ->where('programs.0.name', 'BSc Health Informatics')
        ->where('programs.0.slug', 'bsc-health-informatics')
        ->where('programs.0.level', 'Undergraduate')
        ->where('programs.0.courses_count', 1)
    );
});

test('programs index returns empty array when no programs exist', function () {
    $response = $this->get(route('programs.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Programs')
        ->has('programs')
        ->where('programs', [])
    );
});

test('programs show returns program detail with courses for valid slug', function () {
    $program = TrainingProgram::create([
        'name' => 'MSc Clinical Informatics',
        'slug' => 'msc-clinical-informatics',
        'program_type' => 'Degree',
        'description' => 'Advanced clinical informatics program.',
        'duration' => '2 Years',
        'level' => 'Postgraduate',
    ]);

    Course::create([
        'training_program_id' => $program->id,
        'name' => 'Advanced Health Information Systems',
        'course_code' => 'CI-501',
        'description' => 'Advanced topics in EHR architecture.',
        'duration' => '1 Semester',
    ]);

    $response = $this->get(route('programs.show', ['training_program' => $program->slug]));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('ProgramShow')
        ->has('program')
        ->where('program.name', 'MSc Clinical Informatics')
        ->where('program.slug', 'msc-clinical-informatics')
        ->where('program.level', 'Postgraduate')
        ->has('program.courses', 1)
        ->where('program.courses.0.name', 'Advanced Health Information Systems')
        ->where('program.courses.0.course_code', 'CI-501')
        ->has('relatedPrograms')
    );
});

test('programs show returns 404 for invalid slug', function () {
    $response = $this->get(route('programs.show', ['training_program' => 'non-existent-program']));

    $response->assertNotFound();
});

test('programs show includes related programs excluding current', function () {
    $program = TrainingProgram::create([
        'name' => 'Certificate in Telemedicine',
        'slug' => 'certificate-telemedicine',
        'level' => 'Certificate',
    ]);

    TrainingProgram::create([
        'name' => 'Diploma in Health Data',
        'slug' => 'diploma-health-data',
        'level' => 'Diploma',
    ]);

    $response = $this->get(route('programs.show', ['training_program' => $program->slug]));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('ProgramShow')
        ->where('program.id', $program->id)
        ->has('relatedPrograms', 1)
        ->where('relatedPrograms.0.name', 'Diploma in Health Data')
    );
});
