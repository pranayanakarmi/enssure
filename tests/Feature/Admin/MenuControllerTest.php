<?php

use App\Models\Menu;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin menus index', function () {
    $response = $this->get(route('admin.menus.index'));
    $response->assertRedirect(route('login'));
});

test('admin user can update menu', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $menu = Menu::create([
        'name' => 'Main Menu',
        'is_published' => true,
        'is_main_header_menu' => false,
    ]);

    $response = $this->put(route('admin.menus.update', $menu), [
        'name' => 'Updated Main Menu',
        'is_published' => false,
        'is_main_header_menu' => true,
    ]);

    $response->assertRedirect(route('admin.menus.edit', $menu));
    $menu->refresh();
    expect($menu->name)->toBe('Updated Main Menu');
    expect($menu->is_published)->toBeFalse();
    expect($menu->is_main_header_menu)->toBeTrue();
});
