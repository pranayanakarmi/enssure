<?php

use App\Models\Notice;

test('notices index returns notices with correct props', function () {
    Notice::create([
        'title' => 'Test Notice',
        'slug' => 'test-notice',
        'content' => '<p>Content</p>',
    ]);

    $response = $this->get(route('notices.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Archive')
        ->has('notices')
        ->where('notices.0.title', 'Test Notice')
        ->where('notices.0.slug', 'test-notice')
    );
});

test('notices show returns notice detail for valid slug', function () {
    $notice = Notice::create([
        'title' => 'Detail Notice',
        'slug' => 'detail-notice',
        'content' => '<p>Detail content</p>',
    ]);

    $response = $this->get(route('notices.show', ['notice' => $notice->slug]));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('SingleArchive')
        ->has('notice')
        ->where('notice.title', 'Detail Notice')
        ->where('notice.slug', 'detail-notice')
        ->has('notice.content')
        ->has('relatedNotices')
    );
});

test('notices show returns 404 for invalid slug', function () {
    $response = $this->get(route('notices.show', ['notice' => 'non-existent-slug']));

    $response->assertNotFound();
});
