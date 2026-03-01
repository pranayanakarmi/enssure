<?php

use App\Models\HomeReachItem;
use App\Models\HomeReachSection;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot add stat card', function () {
    HomeReachSection::create([
        'badge_text' => 'Our Reach',
        'title' => 'Title',
        'description' => '',
    ]);

    $response = $this->post(route('admin.home_reach_sections.items.store'), [
        'value' => '2500',
        'suffix' => '+',
        'label' => 'Apprenticeship',
        'order' => 0,
    ]);

    $response->assertRedirect(route('login'));
});

test('admin user can add stat card', function () {
    $section = HomeReachSection::create([
        'badge_text' => 'Our Reach',
        'title' => 'Title',
        'description' => '',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('admin.home_reach_sections.items.store'), [
        'value' => '2500',
        'suffix' => '+',
        'label' => 'Apprenticeship',
        'link_url' => 'https://example.com',
        'order' => 0,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('home_reach_items', [
        'home_reach_section_id' => $section->id,
        'value' => '2500',
        'suffix' => '+',
        'label' => 'Apprenticeship',
        'link_url' => 'https://example.com',
        'order' => 0,
    ]);
});

test('admin user can add stat card with image', function () {
    $section = HomeReachSection::create([
        'badge_text' => 'Our Reach',
        'title' => 'Title',
        'description' => '',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $file = UploadedFile::fake()->image('stat.jpg', 100, 100);

    $response = $this->post(route('admin.home_reach_sections.items.store'), [
        'value' => '65',
        'suffix' => '%',
        'label' => 'Impact',
        'order' => 1,
        'image' => $file,
    ]);

    $response->assertRedirect();
    $item = HomeReachItem::where('home_reach_section_id', $section->id)->first();
    expect($item)->not->toBeNull();
    expect($item->value)->toBe('65');
    expect($item->image)->not->toBeNull();
    Storage::disk('public')->assertExists($item->image);
});

test('admin user can access stat card edit page', function () {
    $section = HomeReachSection::create([
        'badge_text' => 'Our Reach',
        'title' => 'Title',
        'description' => '',
    ]);
    $item = $section->items()->create([
        'value' => '2500',
        'suffix' => '+',
        'label' => 'Apprenticeship',
        'order' => 0,
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.home_reach_items.edit', $item));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/home_reach_items/edit')
        ->has('homeReachItem')
        ->where('homeReachItem.value', '2500')
    );
});

test('admin user can update stat card', function () {
    $section = HomeReachSection::create([
        'badge_text' => 'Our Reach',
        'title' => 'Title',
        'description' => '',
    ]);
    $item = $section->items()->create([
        'value' => '2500',
        'suffix' => '+',
        'label' => 'Apprenticeship',
        'order' => 0,
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.home_reach_items.update', $item), [
        'value' => '3000',
        'suffix' => '+',
        'label' => 'Updated Label',
        'link_url' => 'https://updated.com',
        'order' => 0,
    ]);

    $response->assertRedirect(route('admin.home_reach_sections.edit'));
    $item->refresh();
    expect($item->value)->toBe('3000');
    expect($item->label)->toBe('Updated Label');
    expect($item->link_url)->toBe('https://updated.com');
});

test('admin user can delete stat card', function () {
    $section = HomeReachSection::create([
        'badge_text' => 'Our Reach',
        'title' => 'Title',
        'description' => '',
    ]);
    $item = $section->items()->create([
        'value' => '2500',
        'suffix' => '+',
        'label' => 'Apprenticeship',
        'order' => 0,
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->delete(route('admin.home_reach_items.destroy', $item));
    $response->assertRedirect();
    $this->assertDatabaseMissing('home_reach_items', ['id' => $item->id]);
});
