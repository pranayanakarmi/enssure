<?php

use App\Models\TeamMember;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('admin user can access executive committee index', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.team_members.executive_index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/team-members/index')
        ->has('teamMembers')
        ->where('listingType', 'executive_committee')
    );
});

test('admin user can access staff index', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.team_members.staff_index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/team-members/index')
        ->has('teamMembers')
        ->where('listingType', 'staff')
    );
});

test('executive index only lists executive committee members', function () {
    TeamMember::create([
        'type' => 'executive_committee',
        'name' => 'Executive One',
        'job_title' => 'Chair',
    ]);
    TeamMember::create([
        'type' => 'staff',
        'name' => 'Staff One',
        'job_title' => 'Manager',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.team_members.executive_index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('teamMembers', 1)
        ->where('teamMembers.0.name', 'Executive One')
    );
});

test('staff index only lists staff members', function () {
    TeamMember::create([
        'type' => 'executive_committee',
        'name' => 'Executive One',
        'job_title' => 'Chair',
    ]);
    TeamMember::create([
        'type' => 'staff',
        'name' => 'Staff One',
        'job_title' => 'Manager',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.team_members.staff_index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('teamMembers', 1)
        ->where('teamMembers.0.name', 'Staff One')
    );
});

test('store redirects to executive index when type is executive_committee', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('admin.team_members.store'), [
        'type' => 'executive_committee',
        'name' => 'New Executive',
        'job_title' => 'Vice Chair',
    ]);

    $response->assertRedirect(route('admin.team_members.executive_index'));
    expect(TeamMember::where('type', 'executive_committee')->where('name', 'New Executive')->exists())->toBeTrue();
});

test('store redirects to staff index when type is staff', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('admin.team_members.store'), [
        'type' => 'staff',
        'name' => 'New Staff',
        'job_title' => 'Officer',
    ]);

    $response->assertRedirect(route('admin.team_members.staff_index'));
    expect(TeamMember::where('type', 'staff')->where('name', 'New Staff')->exists())->toBeTrue();
});

test('update redirects to correct index by member type', function () {
    $member = TeamMember::create([
        'type' => 'executive_committee',
        'name' => 'Exec',
        'job_title' => 'Chair',
    ]);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.team_members.update', $member), [
        'type' => 'executive_committee',
        'name' => 'Exec Updated',
        'job_title' => 'Chair',
    ]);

    $response->assertRedirect(route('admin.team_members.executive_index'));
});

test('destroy redirects to correct index by member type', function () {
    $member = TeamMember::create([
        'type' => 'staff',
        'name' => 'Staff',
        'job_title' => 'Officer',
    ]);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->delete(route('admin.team_members.destroy', $member));

    $response->assertRedirect(route('admin.team_members.staff_index'));
    expect(TeamMember::find($member->id))->toBeNull();
});
