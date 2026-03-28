<?php

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('admin can store post with category and tags when ids are strings like multipart form data', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $category = Category::create([
        'name' => 'News',
        'slug' => 'news',
    ]);
    $tagA = Tag::create(['name' => 'Alpha', 'slug' => 'alpha']);
    $tagB = Tag::create(['name' => 'Beta', 'slug' => 'beta']);

    $this->post(route('admin.posts.store'), [
        'title' => 'Multipart style post',
        'slug' => 'multipart-style-post',
        'content' => '<p>Body</p>',
        'category_id' => (string) $category->id,
        'tags' => [(string) $tagA->id, (string) $tagB->id],
        'published_at' => now()->subHour()->format('Y-m-d\TH:i'),
    ])->assertRedirect(route('admin.posts.index'))
        ->assertSessionHas('success');

    $post = Post::query()->where('slug', 'multipart-style-post')->first();
    expect($post)->not->toBeNull();
    expect($post->category_id)->toBe($category->id);
    expect($post->tags->pluck('id')->sort()->values()->all())->toBe([$tagA->id, $tagB->id]);
});

test('admin can store post without image field when no file is uploaded', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $this->post(route('admin.posts.store'), [
        'title' => 'No image post',
        'slug' => 'no-image-post',
        'content' => '<p>OK</p>',
    ])->assertRedirect(route('admin.posts.index'))
        ->assertSessionHas('success');

    expect(Post::query()->where('slug', 'no-image-post')->exists())->toBeTrue();
});

test('admin can store post with featured image upload', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $file = UploadedFile::fake()->image('featured.jpg');

    $this->post(route('admin.posts.store'), [
        'title' => 'With image',
        'slug' => 'with-image-post',
        'content' => '<p>Pic</p>',
        'image' => $file,
    ])->assertRedirect(route('admin.posts.index'))
        ->assertSessionHas('success');

    $post = Post::query()->where('slug', 'with-image-post')->first();
    expect($post)->not->toBeNull();
    expect($post->image)->not->toBeNull();
    Storage::disk('public')->assertExists($post->image);
});
