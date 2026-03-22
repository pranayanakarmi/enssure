<?php

use App\Models\HomeNewsSection;
use App\Models\Notice;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin news ticker index', function () {
    $response = $this->get(route('admin.news_ticker_items.index'));
    $response->assertRedirect(route('login'));
});

test('admin news ticker index includes notices for home latest news selection', function () {
    $notice = Notice::create([
        'title' => 'Ticker Page Notice',
        'slug' => 'ticker-page-notice',
        'content' => '<p>Body</p>',
    ]);

    $section = HomeNewsSection::create([
        'badge_text' => 'Updates',
        'title' => 'Latest News',
        'description' => '',
        'cta_text' => 'View all',
        'cta_url' => '/notices',
    ]);
    $section->notices()->sync([$notice->id => ['order' => 0]]);

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $response = $this->get(route('admin.news_ticker_items.index'));
    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/news_ticker_items/index')
        ->has('allNotices')
        ->where('allNotices.0.id', $notice->id)
        ->where('allNotices.0.slug', 'ticker-page-notice')
        ->where('homeNewsNoticeIds.0', $notice->id)
        ->where('canUpdateHomeNewsNotices', true)
    );
});
