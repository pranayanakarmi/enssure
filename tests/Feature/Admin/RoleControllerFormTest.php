<?php

use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('role create passes permission groups for module UI', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $this->get(route('admin.roles.create'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/roles/create')
            ->has('permission_groups', fn (Assert $groups) => $groups->each(fn (Assert $g) => $g
                ->has('key')
                ->has('label')
                ->has('permissions')
            ))
        );
});

test('role edit passes permission groups with action labels', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $role = Role::where('name', 'admin')->first();
    $this->actingAs($user);

    $this->get(route('admin.roles.edit', $role))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/roles/edit')
            ->has('permission_groups', fn (Assert $groups) => $groups->each(fn (Assert $g) => $g
                ->has('key')
                ->has('label')
                ->has('permissions')
            ))
            ->has('permission_groups.0.permissions.0', fn (Assert $perm) => $perm
                ->has('name')
                ->has('action')
                ->has('action_label')
            )
        );
});
