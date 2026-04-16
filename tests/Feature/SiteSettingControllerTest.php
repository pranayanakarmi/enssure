<?php

use App\Models\SiteSetting;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\FooterSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
    $this->seed(FooterSeeder::class);
});

test('guests cannot access admin site settings edit', function () {
    $response = $this->get(route('admin.site_settings.edit'));
    $response->assertRedirect(route('login'));
});

test('admin user can access admin site settings edit', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.site_settings.edit'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/site_settings/edit')
        ->has('siteSetting')
        ->has('siteSetting.header_phone_1')
        ->has('siteSetting.logo_left_url')
    );
});

test('admin user can update site settings', function () {
    $setting = SiteSetting::first();

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->put(route('admin.site_settings.update'), [
        'header_phone_1' => '+977 1 1111111',
        'header_email' => 'test@example.com',
        'footer_privacy_policy_url' => 'https://example.com/privacy',
        'footer_terms_of_service_url' => 'https://example.com/terms',
        'facebook_url' => 'https://facebook.com/enssure',
        'x_url' => 'https://x.com/enssure',
        'youtube_url' => 'https://youtube.com/enssure',
        'visit_us' => 'ENSSURE Provincial Office, Hetauda, Nepal',
        'working_hours' => 'Mon - Fri: 9:00 AM – 5:00 PM',
    ]);

    $response->assertRedirect();
    $setting->refresh();
    expect($setting->header_phone_1)->toBe('+977 1 1111111');
    expect($setting->header_email)->toBe('test@example.com');
    expect($setting->footer_privacy_policy_url)->toBe('https://example.com/privacy');
    expect($setting->footer_terms_of_service_url)->toBe('https://example.com/terms');
});
