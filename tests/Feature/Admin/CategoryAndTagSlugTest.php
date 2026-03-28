<?php

use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('admin can store category with empty slug and slug is generated from name', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $this->post(route('admin.categories.store'), [
        'name' => 'Careers',
        'slug' => '',
        'description' => null,
        'parent_id' => null,
    ])->assertRedirect(route('admin.categories.index'))
        ->assertSessionHas('success');

    $category = Category::query()->where('name', 'Careers')->first();
    expect($category)->not->toBeNull();
    expect($category->slug)->toBe('careers');
});

test('admin can store tag with empty slug and slug is generated from name', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $this->post(route('admin.tags.store'), [
        'name' => 'Careers',
        'slug' => '',
    ])->assertRedirect(route('admin.tags.index'))
        ->assertSessionHas('success');

    $tag = Tag::query()->where('name', 'Careers')->first();
    expect($tag)->not->toBeNull();
    expect($tag->slug)->toBe('careers');
});
