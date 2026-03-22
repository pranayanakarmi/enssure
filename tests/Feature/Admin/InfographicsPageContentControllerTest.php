<?php

use App\Models\InfographicsPageContent;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin infographics page content edit', function () {
    $response = $this->get(route('admin.infographics_page_content.edit'));
    $response->assertRedirect(route('login'));
});

test('admin user can access admin infographics page content edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.infographics_page_content.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/infographics-page/content_edit')
        ->has('infographicsPageContent')
    );
});

test('admin user can update infographics page content', function () {
    InfographicsPageContent::create([
        'title' => 'Infographics',
        'banner_image' => null,
    ]);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.infographics_page_content.update'), [
        'title' => 'Updated hero title',
    ]);

    $response->assertRedirect();
    $content = InfographicsPageContent::first();
    expect($content->title)->toBe('Updated hero title');
});
