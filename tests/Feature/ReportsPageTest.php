<?php

use App\Models\Document;

test('guest can view reports index', function () {
    $response = $this->get(route('reports.index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Reports')
        ->has('reports', 0)
        ->where('selectedId', null)
    );
});

test('guest sees pdf documents on reports index', function () {
    $document = Document::factory()->create(['title' => 'Annual Report']);

    $response = $this->get(route('reports.index'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Reports')
        ->has('reports', 1)
        ->where('reports.0.title', 'Annual Report')
        ->where('selectedId', $document->id)
    );
});

test('reports index respects id query when valid', function () {
    $first = Document::factory()->create(['title' => 'First', 'order' => 0]);
    $second = Document::factory()->create(['title' => 'Second', 'order' => 1]);

    $this->get(route('reports.index', ['id' => $second->id]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('selectedId', $second->id)
            ->where('reports.1.title', 'Second')
        );
});

test('reports index is sorted by order first', function () {
    Document::factory()->create(['title' => 'Later By Title', 'order' => 2]);
    Document::factory()->create(['title' => 'Earlier By Order', 'order' => 1]);

    $this->get(route('reports.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('reports.0.title', 'Earlier By Order')
            ->where('reports.1.title', 'Later By Title')
        );
});

test('reports index ignores invalid id query and falls back to first', function () {
    $first = Document::factory()->create(['title' => 'First']);
    Document::factory()->create(['title' => 'Second']);

    $this->get(route('reports.index', ['id' => 99999]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('selectedId', $first->id)
        );
});

test('reports index excludes non pdf documents', function () {
    Document::factory()->notPdf()->create();

    $this->get(route('reports.index'))->assertInertia(fn ($page) => $page
        ->component('Reports')
        ->has('reports', 0)
        ->where('selectedId', null)
    );
});

test('legacy report show url redirects to index with id', function () {
    $document = Document::factory()->create(['title' => 'Quarterly PDF']);

    $this->get(route('reports.show', $document))
        ->assertRedirect(route('reports.index', ['id' => $document->id]));
});

test('guest gets 404 for non pdf document on show', function () {
    $document = Document::factory()->notPdf()->create();

    $this->get(route('reports.show', $document))->assertNotFound();
});
