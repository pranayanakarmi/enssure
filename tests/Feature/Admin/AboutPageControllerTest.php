<?php

use App\Models\AboutContentSection;
use App\Models\AboutMainSection;
use App\Models\AboutPageHero;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('about page returns hero main and content section when records exist', function () {
    AboutPageHero::create(['title' => 'About Us', 'hero_image' => null]);
    AboutMainSection::create([
        'title' => 'ENSSURE',
        'body' => '<p>Body</p>',
        'card_title' => 'Skill Upgrading',
        'cta_text' => 'Explore',
        'cta_url' => '#',
    ]);
    AboutContentSection::create([
        'paragraph_1' => 'First paragraph.',
        'paragraph_2' => 'Second paragraph.',
    ]);

    $response = $this->get(route('about'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('About')
        ->has('aboutPageHero')
        ->has('aboutMainSection')
        ->has('aboutContentSection')
        ->where('aboutPageHero.title', 'About Us')
        ->where('aboutMainSection.title', 'ENSSURE')
        ->where('aboutContentSection.paragraph_1', 'First paragraph.')
        ->where('aboutContentSection.paragraph_2', 'Second paragraph.')
    );
});

test('about page returns null sections when no records exist', function () {
    $response = $this->get(route('about'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('About')
        ->where('aboutPageHero', null)
        ->where('aboutMainSection', null)
        ->where('aboutContentSection', null)
    );
});

test('guests cannot access admin about page hero edit', function () {
    $response = $this->get(route('admin.about_page_hero.edit'));
    $response->assertRedirect(route('login'));
});

test('admin user can access admin about page hero edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.about_page_hero.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/about_page/hero_edit')
        ->has('aboutPageHero')
    );
});

test('admin user can update about page hero', function () {
    AboutPageHero::create(['title' => 'About Us', 'hero_image' => null]);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.about_page_hero.update'), [
        'title' => 'About ENSSURE',
    ]);

    $response->assertRedirect();
    expect(AboutPageHero::first()->title)->toBe('About ENSSURE');
});

test('admin user can access admin about main section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.about_main_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/about_page/main_section_edit')
        ->has('aboutMainSection')
    );
});

test('admin user can update about main section', function () {
    AboutMainSection::create([
        'title' => 'Original',
        'card_title' => 'Card',
        'cta_text' => 'CTA',
        'cta_url' => '#',
    ]);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.about_main_sections.update'), [
        'title' => 'Updated Title',
        'card_title' => 'Updated Card',
        'cta_text' => 'Read more',
        'cta_url' => '/about',
    ]);

    $response->assertRedirect();
    $section = AboutMainSection::first();
    expect($section->title)->toBe('Updated Title');
    expect($section->card_title)->toBe('Updated Card');
    expect($section->cta_text)->toBe('Read more');
    expect($section->cta_url)->toBe('/about');
});

test('admin user can access admin about content section edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.about_content_sections.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/about_page/content_section_edit')
        ->has('aboutContentSection')
    );
});

test('admin user can update about content section', function () {
    AboutContentSection::create([
        'paragraph_1' => 'P1',
        'paragraph_2' => 'P2',
    ]);
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.about_content_sections.update'), [
        'paragraph_1' => 'Updated first paragraph.',
        'paragraph_2' => 'Updated second paragraph.',
    ]);

    $response->assertRedirect();
    $section = AboutContentSection::first();
    expect($section->paragraph_1)->toBe('Updated first paragraph.');
    expect($section->paragraph_2)->toBe('Updated second paragraph.');
});
