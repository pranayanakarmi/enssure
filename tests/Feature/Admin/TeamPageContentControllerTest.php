<?php

use App\Models\TeamPageContent;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin team page content edit', function () {
    $response = $this->get(route('admin.team_page_content.edit'));
    $response->assertRedirect(route('login'));
});

test('admin user can access admin team page content edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.team_page_content.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/team_page/content_edit')
        ->has('teamPageContent')
    );
});

test('admin user can update team page content', function () {
    TeamPageContent::create([
        'title' => 'Our Team',
        'description' => null,
        'banner_image' => null,
    ]);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.team_page_content.update'), [
        'title' => 'The Team',
        'description' => 'Updated description.',
    ]);

    $response->assertRedirect();
    $content = TeamPageContent::first();
    expect($content->title)->toBe('The Team');
    expect($content->description)->toBe('Updated description.');
});
