<?php

use App\Models\User;
use App\Models\Vacancy;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

it('generates a unique slug from position title when storing a vacancy', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $this->post(route('admin.vacancies.store'), [
        'position_title' => 'Senior Project Manager',
        'job_description' => '<p>Test</p>',
        'status' => 'open',
        'job_type' => 'full_time',
    ])->assertRedirect(route('admin.vacancies.index'));

    expect(Vacancy::query()->where('slug', 'senior-project-manager')->exists())->toBeTrue();
});

it('appends a numeric suffix when the slug already exists', function () {
    Vacancy::create([
        'position_title' => 'Senior Project Manager',
        'slug' => 'senior-project-manager',
        'status' => 'open',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $this->post(route('admin.vacancies.store'), [
        'position_title' => 'Senior Project Manager',
        'status' => 'open',
    ])->assertRedirect(route('admin.vacancies.index'));

    expect(Vacancy::query()->where('slug', 'senior-project-manager-1')->exists())->toBeTrue();
});

it('stores related documents when creating a vacancy', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $first = UploadedFile::fake()->create('job-description.pdf', 50, 'application/pdf');
    $second = UploadedFile::fake()->create('annex.docx', 50, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    $this->post(route('admin.vacancies.store'), [
        'position_title' => 'Program Officer',
        'status' => 'open',
        'related_documents' => [$first, $second],
    ])->assertRedirect(route('admin.vacancies.index'));

    $vacancy = Vacancy::query()->where('slug', 'program-officer')->first();
    expect($vacancy)->not->toBeNull();
    expect($vacancy->relatedDocuments()->count())->toBe(2);
});
