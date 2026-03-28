<?php

use App\Models\Infographic;
use App\Models\InfographicItem;
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

    $infographic = Infographic::factory()->create(['slug' => 'listed-infographic']);

    $response = $this->get(route('admin.infographics.index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/infographics/index')
        ->has('infographics')
        ->where('infographics.0.public_url', url()->route('infographics.show', $infographic))
    );
});

test('admin user can create infographic', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('admin.infographics.store'), [
        'title' => 'Employers co-contribute',
        'slug' => 'employers-co-contribute',
    ]);

    $response->assertRedirect(route('admin.infographics.index'));
    expect(Infographic::count())->toBe(1);
    $row = Infographic::first();
    expect($row->title)->toBe('Employers co-contribute');
    expect($row->slug)->toBe('employers-co-contribute');
});

test('admin user can update infographic', function () {
    $infographic = Infographic::create([
        'title' => 'Old title',
        'slug' => 'old-slug',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.infographics.update', $infographic), [
        'title' => 'New title',
        'slug' => 'new-slug',
    ]);

    $response->assertRedirect(route('admin.infographics.index'));
    $infographic->refresh();
    expect($infographic->title)->toBe('New title');
    expect($infographic->slug)->toBe('new-slug');
});

test('admin user can delete infographic', function () {
    $infographic = Infographic::create([
        'title' => 'Remove me',
        'slug' => 'remove-me',
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->delete(route('admin.infographics.destroy', $infographic));

    $response->assertRedirect(route('admin.infographics.index'));
    expect(Infographic::find($infographic->id))->toBeNull();
});

test('admin infographic edit page includes public url', function () {
    $infographic = Infographic::factory()->create();

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.infographics.edit', $infographic));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->where('infographic.title', $infographic->title)
        ->where('infographic.slug', $infographic->slug)
        ->where('infographic.public_url', url()->route('infographics.show', $infographic))
    );
});

test('admin user can reorder infographic items', function () {
    $infographic = Infographic::factory()->create();
    $first = InfographicItem::factory()->create([
        'infographic_id' => $infographic->id,
        'sort_order' => 0,
    ]);
    $second = InfographicItem::factory()->create([
        'infographic_id' => $infographic->id,
        'sort_order' => 1,
    ]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('admin.infographics.items.reorder', $infographic), [
        'item_ids' => [$second->id, $first->id],
    ]);

    $response->assertRedirect();
    expect($second->fresh()->sort_order)->toBe(0);
    expect($first->fresh()->sort_order)->toBe(1);
});

test('admin user can add infographic item from infographic edit page', function () {
    Storage::fake('public');
    $infographic = Infographic::factory()->create(['slug' => 'youth-infographic']);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->post(route('admin.infographics.items.store', $infographic), [
        'title' => 'Inclusive and Transformative Changes in Youth',
        'sort_order' => 1,
        'image' => UploadedFile::fake()->image('item.png', 1000, 450),
    ]);

    $response->assertRedirect();
    expect(InfographicItem::query()->count())->toBe(1);
    $item = InfographicItem::query()->first();
    expect($item->title)->toBe('Inclusive and Transformative Changes in Youth');
    expect($item->sort_order)->toBe(1);
    expect($item->infographic_id)->toBe($infographic->id);
    Storage::disk('public')->assertExists($item->image);
});
