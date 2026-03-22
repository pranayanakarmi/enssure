<?php

use App\Models\Document;
use App\Models\User;
use Database\Seeders\ContentPermissionsSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->seed(ContentPermissionsSeeder::class);
});

test('guests cannot access admin documents index', function () {
    $this->get(route('admin.documents.index'))->assertRedirect(route('login'));
});

test('admin user can access admin documents index', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $this->get(route('admin.documents.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/documents/index')
            ->has('documents')
        );
});

test('admin user can upload pdf document', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $file = UploadedFile::fake()->create('report.pdf', 100, 'application/pdf');

    $response = $this->post(route('admin.documents.store'), [
        'title' => 'Q1 Report',
        'document_type' => 'report',
        'file' => $file,
    ]);

    $response->assertRedirect(route('admin.documents.index'));

    $document = Document::where('title', 'Q1 Report')->first();
    expect($document)->not->toBeNull();
    expect(strtolower((string) $document->file_extension))->toBe('pdf');
    Storage::disk('public')->assertExists($document->file_path);
});
