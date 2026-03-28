<?php

use App\Models\Post;
use Inertia\Testing\AssertableInertia as Assert;

test('posts index returns only published posts with correct component', function () {
    Post::create([
        'title' => 'Published Post',
        'slug' => 'published-post',
        'published_at' => now()->subDay(),
    ]);

    Post::create([
        'title' => 'Draft Post',
        'slug' => 'draft-post',
        'published_at' => null,
    ]);

    Post::create([
        'title' => 'Future Post',
        'slug' => 'future-post',
        'published_at' => now()->addDay(),
    ]);

    $response = $this->get(route('posts.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('BlogIndex')
        ->has('posts', 1)
        ->where('posts.0.title', 'Published Post')
        ->where('posts.0.slug', 'published-post')
    );
});

test('posts index orders published posts by published_at descending', function () {
    Post::create([
        'title' => 'Older',
        'slug' => 'older',
        'published_at' => now()->subDays(5),
    ]);

    Post::create([
        'title' => 'Newer',
        'slug' => 'newer',
        'published_at' => now()->subDay(),
    ]);

    $response = $this->get(route('posts.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->where('posts.0.title', 'Newer')
        ->where('posts.1.title', 'Older')
    );
});

test('posts show returns published post detail', function () {
    $post = Post::create([
        'title' => 'Blog Detail',
        'slug' => 'blog-detail',
        'excerpt' => 'Short excerpt',
        'content' => '<p>Body</p>',
        'published_at' => now()->subHour(),
    ]);

    $response = $this->get(route('posts.show', ['published_post' => $post->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('BlogShow')
        ->has('post')
        ->where('post.title', 'Blog Detail')
        ->where('post.slug', 'blog-detail')
        ->where('post.excerpt', 'Short excerpt')
        ->has('post.content')
        ->has('relatedPosts')
    );
});

test('posts show returns 404 for draft post', function () {
    Post::create([
        'title' => 'Draft',
        'slug' => 'draft-only',
        'published_at' => null,
    ]);

    $response = $this->get(route('posts.show', ['published_post' => 'draft-only']));

    $response->assertNotFound();
});

test('posts show returns 404 for future scheduled post', function () {
    Post::create([
        'title' => 'Scheduled',
        'slug' => 'scheduled',
        'published_at' => now()->addWeek(),
    ]);

    $response = $this->get(route('posts.show', ['published_post' => 'scheduled']));

    $response->assertNotFound();
});

test('posts show returns 404 for invalid slug', function () {
    $response = $this->get(route('posts.show', ['published_post' => 'missing']));

    $response->assertNotFound();
});
