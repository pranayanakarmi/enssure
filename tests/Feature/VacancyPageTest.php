<?php

use App\Models\Vacancy;
use App\Models\VacancyApplication;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('shows published open vacancies on the public vacancy page', function () {
    Vacancy::create([
        'position_title' => 'Project Manager',
        'slug' => 'project-manager-public-1',
        'job_description' => '<p>Test description for the role.</p>',
        'status' => 'open',
        'published_at' => now()->subDay(),
        'application_deadline' => now()->addMonth(),
    ]);

    $response = $this->get(route('vacancy'));
    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('Vacancy')
        ->has('vacancies', 1)
        ->where('vacancies.0.title', 'Project Manager')
        ->where('vacancies.0.excerpt', 'Test description for the role.')
    );
});

it('does not list vacancies that are unpublished, closed, or past deadline', function () {
    Vacancy::create([
        'position_title' => 'Unpublished',
        'slug' => 'unpublished-1',
        'status' => 'open',
        'published_at' => null,
    ]);
    Vacancy::create([
        'position_title' => 'Closed Role',
        'slug' => 'closed-1',
        'status' => 'closed',
        'published_at' => now()->subDay(),
    ]);
    Vacancy::create([
        'position_title' => 'Past Deadline',
        'slug' => 'past-deadline-1',
        'status' => 'open',
        'published_at' => now()->subWeek(),
        'application_deadline' => now()->subDay(),
    ]);

    $this->get(route('vacancy'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page->has('vacancies', 0));
});

it('shows vacancy detail for a published vacancy', function () {
    $vacancy = Vacancy::create([
        'position_title' => 'Detail Role',
        'slug' => 'detail-role-1',
        'job_description' => '<p>Full description</p>',
        'requirements' => '<p>Requirement text</p>',
        'status' => 'open',
        'published_at' => now()->subDay(),
        'application_deadline' => now()->addMonth(),
    ]);

    $response = $this->get(route('vacancy.show', ['vacancy' => $vacancy->slug]));
    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('VacancyDetail')
        ->where('vacancy.slug', 'detail-role-1')
        ->where('vacancy.title', 'Detail Role')
    );
});

it('returns 404 for vacancy detail when not publicly listed', function () {
    $vacancy = Vacancy::create([
        'position_title' => 'Hidden',
        'slug' => 'hidden-detail',
        'status' => 'open',
        'published_at' => null,
    ]);

    $this->get(route('vacancy.show', ['vacancy' => $vacancy->slug]))
        ->assertNotFound();
});

it('stores a vacancy application with resume', function () {
    Storage::fake('public');

    $vacancy = Vacancy::create([
        'position_title' => 'Apply Role',
        'slug' => 'apply-role-1',
        'status' => 'open',
        'published_at' => now()->subDay(),
        'application_deadline' => now()->addMonth(),
    ]);

    $file = UploadedFile::fake()->create('resume.pdf', 200, 'application/pdf');

    $response = $this->post(route('vacancy.apply', ['vacancy' => $vacancy->slug]), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => '+1234567890',
        'cover_letter' => 'Hello',
        'resume' => $file,
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('vacancy_applications', [
        'vacancy_id' => $vacancy->id,
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
    ]);

    $application = VacancyApplication::query()->first();
    expect($application)->not->toBeNull();
    Storage::disk('public')->assertExists($application->resume_path);
});
