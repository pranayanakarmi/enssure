<?php

use App\Models\Page;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('admin can store page with parent id sent as string', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $parent = Page::factory()->create([
        'title' => 'Parent',
        'slug' => 'parent-page',
    ]);

    $this->post(route('admin.pages.store'), [
        'title' => 'Child page',
        'slug' => 'child-page',
        'content' => '<p>Body</p>',
        'parent_id' => (string) $parent->id,
        'published_at' => now()->subHour()->format('Y-m-d\TH:i'),
    ])->assertRedirect(route('admin.pages.index'))
        ->assertSessionHas('success');

    $child = Page::query()->where('slug', 'child-page')->first();
    expect($child)->not->toBeNull();
    expect($child->parent_id)->toBe($parent->id);
});

test('admin can store page without slug and receives auto slug from title', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $this->post(route('admin.pages.store'), [
        'title' => 'Auto Slug Title Here',
        'content' => '<p>OK</p>',
    ])->assertRedirect(route('admin.pages.index'))
        ->assertSessionHas('success');

    expect(Page::query()->where('slug', 'auto-slug-title-here')->exists())->toBeTrue();
});

test('admin cannot set page parent to its descendant', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $parent = Page::factory()->create([
        'title' => 'Parent',
        'slug' => 'cycle-parent',
    ]);
    $child = Page::factory()->create([
        'title' => 'Child',
        'slug' => 'cycle-child',
        'parent_id' => $parent->id,
    ]);

    $this->put(route('admin.pages.update', $parent), [
        'title' => $parent->title,
        'slug' => $parent->slug,
        'content' => $parent->content,
        'parent_id' => $child->id,
    ])->assertSessionHasErrors('parent_id');
});

test('guest cannot create page', function () {
    $this->post(route('admin.pages.store'), [
        'title' => 'Hack',
        'slug' => 'hack',
    ])->assertRedirect();
});
