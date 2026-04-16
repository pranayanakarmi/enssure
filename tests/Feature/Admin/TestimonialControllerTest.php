<?php

use App\Models\Testimonial;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('admin can create testimonial with uploaded image and published state', function () {
    Storage::fake('public');

    /** @var User $admin */
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    $this->actingAs($admin);

    $response = $this->post(route('admin.testimonials.store'), [
        'name' => 'Image Testimonial',
        'designation' => 'Program Graduate',
        'testimonial_text' => 'The apprenticeship model helped me move into paid work quickly.',
        'image' => UploadedFile::fake()->image('testimonial.jpg', 300, 300),
        'is_published' => true,
        'order' => 1,
    ]);

    $response->assertRedirect(route('admin.testimonials.index'));

    $testimonial = Testimonial::query()->where('name', 'Image Testimonial')->first();

    expect($testimonial)->not->toBeNull();
    expect($testimonial->is_published)->toBeTrue();
    expect($testimonial->image)->not->toBeNull();

    expect(Storage::disk('public')->exists($testimonial->image))->toBeTrue();
});

test('admin can update published state without replacing existing testimonial image', function () {
    Storage::fake('public');

    $storedPath = UploadedFile::fake()->image('existing.jpg', 300, 300)->store('testimonials', 'public');

    $testimonial = Testimonial::create([
        'name' => 'Existing Testimonial',
        'designation' => 'Trainer',
        'image' => $storedPath,
        'testimonial_text' => 'Initial testimonial text.',
        'is_published' => true,
        'order' => 0,
    ]);

    /** @var User $admin */
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    $this->actingAs($admin);

    $response = $this->put(route('admin.testimonials.update', $testimonial), [
        'name' => 'Existing Testimonial',
        'designation' => 'Trainer',
        'testimonial_text' => 'Updated testimonial text.',
        'is_published' => false,
        'order' => 2,
    ]);

    $response->assertRedirect(route('admin.testimonials.index'));

    $testimonial->refresh();

    expect($testimonial->is_published)->toBeFalse();
    expect($testimonial->image)->toBe($storedPath);
    expect(Storage::disk('public')->exists($storedPath))->toBeTrue();
});
