<?php

use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Post;
use Inertia\Testing\AssertableInertia as Assert;

test('main menu is empty when no published main header menu exists', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->where('mainMenu', [])
    );
});

test('main menu is empty when menu exists but is not published', function () {
    Menu::create([
        'name' => 'Header',
        'is_published' => false,
        'is_main_header_menu' => true,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->where('mainMenu', [])
    );
});

test('main menu is empty when menu exists but is not main header', function () {
    Menu::create([
        'name' => 'Footer',
        'is_published' => true,
        'is_main_header_menu' => false,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->where('mainMenu', [])
    );
});

test('main menu returns tree when published main header menu exists with items', function () {
    $menu = Menu::create([
        'name' => 'Main Header',
        'is_published' => true,
        'is_main_header_menu' => true,
    ]);

    MenuItem::create([
        'menu_id' => $menu->id,
        'parent_id' => null,
        'title' => 'Home',
        'url' => '/',
        'target' => '_self',
        'order' => 0,
    ]);

    MenuItem::create([
        'menu_id' => $menu->id,
        'parent_id' => null,
        'title' => 'About',
        'url' => '/about',
        'target' => '_self',
        'order' => 1,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->has('mainMenu', 2)
        ->where('mainMenu.0.title', 'Home')
        ->where('mainMenu.0.href', '/')
        ->where('mainMenu.0.target', '_self')
        ->where('mainMenu.0.children', [])
        ->where('mainMenu.1.title', 'About')
        ->where('mainMenu.1.href', '/about')
        ->where('mainMenu.1.children', [])
    );
});

test('main menu returns nested children in tree', function () {
    $menu = Menu::create([
        'name' => 'Main Header',
        'is_published' => true,
        'is_main_header_menu' => true,
    ]);

    $parent = MenuItem::create([
        'menu_id' => $menu->id,
        'parent_id' => null,
        'title' => 'Services',
        'url' => '/services',
        'target' => '_self',
        'order' => 0,
    ]);

    MenuItem::create([
        'menu_id' => $menu->id,
        'parent_id' => $parent->id,
        'title' => 'Sub Item',
        'url' => '/services/sub',
        'target' => '_self',
        'order' => 0,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->has('mainMenu', 1)
        ->where('mainMenu.0.title', 'Services')
        ->where('mainMenu.0.href', '/services')
        ->has('mainMenu.0.children', 1)
        ->where('mainMenu.0.children.0.title', 'Sub Item')
        ->where('mainMenu.0.children.0.href', '/services/sub')
        ->where('mainMenu.0.children.0.children', [])
    );
});

test('main menu resolves href from post when url is empty', function () {
    $menu = Menu::create([
        'name' => 'Main Header',
        'is_published' => true,
        'is_main_header_menu' => true,
    ]);

    $post = Post::create([
        'title' => 'Blog Post',
        'slug' => 'blog-post',
    ]);

    MenuItem::create([
        'menu_id' => $menu->id,
        'parent_id' => null,
        'title' => 'Blog',
        'url' => null,
        'post_id' => $post->id,
        'target' => '_self',
        'order' => 0,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->has('mainMenu', 1)
        ->where('mainMenu.0.title', 'Blog')
        ->where('mainMenu.0.href', '/posts/blog-post')
        ->where('mainMenu.0.children', [])
    );
});

test('only the published main header menu is used when multiple menus exist', function () {
    Menu::create([
        'name' => 'Other',
        'is_published' => true,
        'is_main_header_menu' => false,
    ]);

    $mainMenu = Menu::create([
        'name' => 'Main Header',
        'is_published' => true,
        'is_main_header_menu' => true,
    ]);

    MenuItem::create([
        'menu_id' => $mainMenu->id,
        'parent_id' => null,
        'title' => 'From Main',
        'url' => '/main',
        'target' => '_self',
        'order' => 0,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->has('mainMenu', 1)
        ->where('mainMenu.0.title', 'From Main')
    );
});
