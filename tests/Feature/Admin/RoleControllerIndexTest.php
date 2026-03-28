<?php

use App\Models\User;
use Database\Seeders\RoleSeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
});

test('admin roles index lists roles without a permissions property on each row', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.roles.index'));

    $response->assertSuccessful();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/roles/index')
        ->has('roles', fn (Assert $roles) => $roles
            ->each(fn (Assert $role) => $role
                ->has('id')
                ->has('name')
                ->has('users_count')
                ->missing('permissions')
            )
        )
    );
});
