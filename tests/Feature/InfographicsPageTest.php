<?php

use App\Models\Infographic;
use App\Models\InfographicsPageContent;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('infographics page returns 200 with page content and list', function () {
    $response = $this->get(route('infographics'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Infographics')
        ->has('pageContent')
        ->has('infographics')
        ->where('pageContent.title', 'Infographics')
    );
});

test('infographics page shows content and items from database', function () {
    Storage::fake('public');
    $path = UploadedFile::fake()->image('section.png')->store('infographics', 'public');

    InfographicsPageContent::create([
        'title' => 'Dual VET Apprenticeship',
        'banner_image' => null,
    ]);

    Infographic::create([
        'title' => 'Youth outcomes',
        'image' => $path,
        'sort_order' => 1,
    ]);

    $response = $this->get(route('infographics'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Infographics')
        ->where('pageContent.title', 'Dual VET Apprenticeship')
        ->has('infographics', 1)
        ->where('infographics.0.title', 'Youth outcomes')
    );
});
