<?php

use App\Models\User;
use App\Models\Vacancy;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

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
