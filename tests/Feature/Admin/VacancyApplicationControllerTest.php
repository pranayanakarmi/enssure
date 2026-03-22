<?php

use App\Models\User;
use App\Models\Vacancy;
use App\Models\VacancyApplication;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

it('allows admin to view vacancy applications index', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.vacancy_applications.index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/vacancy-applications/index')
        ->has('applications')
    );
});

it('allows admin to view a single application', function () {
    $vacancy = Vacancy::create([
        'position_title' => 'Role',
        'slug' => 'role-1',
        'status' => 'open',
        'published_at' => now(),
    ]);

    $application = VacancyApplication::create([
        'vacancy_id' => $vacancy->id,
        'name' => 'Applicant',
        'email' => 'a@example.com',
        'phone' => '123',
        'cover_letter' => 'Hi',
        'resume_path' => 'vacancy-applications/1/test.pdf',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.vacancy_applications.show', $application));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/vacancy-applications/show')
        ->where('application.name', 'Applicant')
    );
});
