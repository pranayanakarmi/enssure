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
        'order' => 5,
        'file' => $file,
    ]);

    $response->assertRedirect(route('admin.documents.index'));

    $document = Document::where('title', 'Q1 Report')->first();
    expect($document)->not->toBeNull();
    expect(strtolower((string) $document->file_extension))->toBe('pdf');
    expect($document->order)->toBe(5);
    Storage::disk('public')->assertExists($document->file_path);
});

test('admin user can reorder documents', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');
    $this->actingAs($user);

    $first = Document::factory()->create(['title' => 'First', 'order' => 0]);
    $second = Document::factory()->create(['title' => 'Second', 'order' => 1]);

    $response = $this->post(route('admin.documents.reorder'), [
        'documents' => [
            ['id' => $first->id, 'order' => 1],
            ['id' => $second->id, 'order' => 0],
        ],
    ]);

    $response->assertRedirect(route('admin.documents.index'));
    expect($first->fresh()->order)->toBe(1);
    expect($second->fresh()->order)->toBe(0);
});
