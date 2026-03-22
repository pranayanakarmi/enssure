<?php

use App\Models\Infographic;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin infographics index', function () {
    $response = $this->get(route('admin.infographics.index'));
    $response->assertRedirect(route('login'));
});

test('admin user can access infographics index', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.infographics.index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/infographics/index')
        ->has('infographics')
    );
});

test('admin user can create infographic', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $file = UploadedFile::fake()->image('chart.png', 800, 400);

    $response = $this->post(route('admin.infographics.store'), [
        'title' => 'Employers co-contribute',
        'sort_order' => 2,
        'image' => $file,
    ]);

    $response->assertRedirect(route('admin.infographics.index'));
    expect(Infographic::count())->toBe(1);
    $row = Infographic::first();
    expect($row->title)->toBe('Employers co-contribute');
    expect($row->sort_order)->toBe(2);
    Storage::disk('public')->assertExists($row->image);
});

test('admin user can update infographic', function () {
    Storage::fake('public');
    $path = UploadedFile::fake()->image('old.png')->store('infographics', 'public');
    $infographic = Infographic::create([
        'title' => 'Old title',
        'image' => $path,
        'sort_order' => 0,
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.infographics.update', $infographic), [
        'title' => 'New title',
        'sort_order' => 5,
    ]);

    $response->assertRedirect(route('admin.infographics.index'));
    $infographic->refresh();
    expect($infographic->title)->toBe('New title');
    expect($infographic->sort_order)->toBe(5);
    expect($infographic->image)->toBe($path);
});

test('admin user can delete infographic', function () {
    Storage::fake('public');
    $path = UploadedFile::fake()->image('gone.png')->store('infographics', 'public');
    $infographic = Infographic::create([
        'title' => 'Remove me',
        'image' => $path,
        'sort_order' => 0,
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->delete(route('admin.infographics.destroy', $infographic));

    $response->assertRedirect(route('admin.infographics.index'));
    expect(Infographic::find($infographic->id))->toBeNull();
    Storage::disk('public')->assertMissing($path);
});
