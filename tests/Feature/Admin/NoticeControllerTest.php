<?php

use App\Models\Notice;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin notices index', function () {
    $response = $this->get(route('admin.notices.index'));
    $response->assertRedirect(route('login'));
});

test('admin user can access admin notices index', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.notices.index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/notices/index')
        ->has('notices')
    );
});

test('admin user can access admin notices create', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.notices.create'));
    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page->component('admin/notices/create'));
});

test('admin user can access admin notices edit', function () {
    $notice = Notice::create([
        'title' => 'Editable Notice',
        'slug' => 'editable-notice',
        'content' => '<p>Content</p>',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.notices.edit', $notice));
    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/notices/edit')
        ->has('notice')
        ->where('notice.id', $notice->id)
        ->where('notice.slug', 'editable-notice')
    );
});

test('admin user can create notice with image', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $image = UploadedFile::fake()->image('notice.jpg');

    $response = $this->post(route('admin.notices.store'), [
        'title' => 'New Notice',
        'content' => '<p>Notice content</p>',
        'image' => $image,
    ]);

    $response->assertRedirect(route('admin.notices.index'));

    $notice = Notice::where('title', 'New Notice')->first();
    expect($notice)->not->toBeNull();
    expect($notice->slug)->toBe('new-notice');
    expect($notice->image)->not->toBeNull();
});

test('admin user can update notice', function () {
    $notice = Notice::create([
        'title' => 'Original Title',
        'slug' => 'original-title',
        'content' => 'Original content',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.notices.update', $notice), [
        'title' => 'Updated Title',
        'slug' => 'updated-title',
        'content' => 'Updated content',
    ]);

    $response->assertRedirect(route('admin.notices.index'));

    $notice->refresh();
    expect($notice->title)->toBe('Updated Title');
    expect($notice->slug)->toBe('updated-title');
});

test('admin user can remove notice image', function () {
    Storage::fake('public');
    $notice = Notice::create([
        'title' => 'With Image',
        'slug' => 'with-image',
        'content' => 'Content',
        'image' => 'notices/test.jpg',
    ]);
    Storage::disk('public')->put('notices/test.jpg', 'fake-image-content');

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.notices.update', $notice), [
        'title' => 'With Image',
        'slug' => 'with-image',
        'content' => 'Content',
        'remove_image' => true,
    ]);

    $response->assertRedirect(route('admin.notices.index'));

    $notice->refresh();
    expect($notice->image)->toBeNull();
});

test('admin user can delete notice', function () {
    $notice = Notice::create([
        'title' => 'To Delete',
        'slug' => 'to-delete',
        'content' => 'Content',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->delete(route('admin.notices.destroy', $notice));

    $response->assertRedirect(route('admin.notices.index'));
    expect(Notice::find($notice->id))->toBeNull();
});
