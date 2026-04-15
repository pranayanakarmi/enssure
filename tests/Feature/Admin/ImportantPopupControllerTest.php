<?php

use App\Models\ImportantPopup;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access important popup index page', function () {
    $response = $this->get(route('admin.important_popups.index'));

    $response->assertRedirect(route('login'));
});

test('admin user can access important popup list page', function () {
    ImportantPopup::create([
        'title' => 'Homepage alert',
        'description' => 'A visible alert',
        'is_active' => true,
    ]);

    /** @var User $user */
    $user = User::factory()->createOne();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.important_popups.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/important_popups/index')
        ->has('importantPopups', 1)
    );
});

test('admin user can create important popup content', function () {
    $existingActivePopup = ImportantPopup::create([
        'title' => 'Existing active popup',
        'description' => 'Old active popup',
        'is_active' => true,
    ]);

    /** @var User $user */
    $user = User::factory()->createOne();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('admin.important_popups.store'), [
        'title' => 'Created popup title',
        'description' => 'Created popup content',
        'cta_text' => 'Read Update',
        'cta_url' => 'https://example.org/new',
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.important_popups.index'));

    $createdPopup = ImportantPopup::query()->where('title', 'Created popup title')->first();

    expect($createdPopup)->not()->toBeNull();
    expect($createdPopup->description)->toBe('Created popup content');
    expect($createdPopup->cta_text)->toBe('Read Update');
    expect($createdPopup->cta_url)->toBe('https://example.org/new');
    expect($createdPopup->is_active)->toBeTrue();

    $existingActivePopup->refresh();
    expect($existingActivePopup->is_active)->toBeFalse();
});

test('admin user can update important popup content', function () {
    $activePopup = ImportantPopup::create([
        'title' => 'Active popup',
        'description' => 'Currently active',
        'is_active' => true,
    ]);

    $popup = ImportantPopup::create([
        'title' => 'Old title',
        'description' => 'Old description',
        'cta_text' => 'Old CTA',
        'cta_url' => 'https://example.org/old',
        'is_active' => false,
    ]);

    /** @var User $user */
    $user = User::factory()->createOne();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.important_popups.update', $popup), [
        'title' => 'New popup title',
        'description' => 'Updated standalone popup content',
        'cta_text' => 'Read Update',
        'cta_url' => 'https://example.org/new',
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.important_popups.index'));

    $popup->refresh();
    expect($popup->title)->toBe('New popup title');
    expect($popup->description)->toBe('Updated standalone popup content');
    expect($popup->cta_text)->toBe('Read Update');
    expect($popup->cta_url)->toBe('https://example.org/new');
    expect($popup->is_active)->toBeTrue();

    $activePopup->refresh();
    expect($activePopup->is_active)->toBeFalse();
});

test('admin user can delete an important popup', function () {
    $popup = ImportantPopup::create([
        'title' => 'Delete me',
        'description' => 'Temporary popup',
        'is_active' => false,
    ]);

    /** @var User $user */
    $user = User::factory()->createOne();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->delete(route('admin.important_popups.destroy', $popup));

    $response->assertRedirect(route('admin.important_popups.index'));
    expect(ImportantPopup::find($popup->id))->toBeNull();
});
