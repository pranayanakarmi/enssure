<?php

use App\Models\Infographic;
use App\Models\InfographicItem;
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
    InfographicsPageContent::create([
        'title' => 'Dual VET Apprenticeship',
        'banner_image' => null,
    ]);

    Infographic::create([
        'title' => 'Youth outcomes',
        'slug' => 'youth-outcomes',
    ]);

    $response = $this->get(route('infographics'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Infographics')
        ->where('pageContent.title', 'Dual VET Apprenticeship')
        ->has('infographics', 1)
        ->where('infographics.0.label', 'Youth outcomes')
        ->where('infographics.0.slug', 'youth-outcomes')
    );
});

test('infographic detail page shows child infographic items and page hero content', function () {
    Storage::fake('public');
    InfographicsPageContent::create([
        'title' => 'Our Infographics',
        'banner_image' => null,
    ]);

    $infographic = Infographic::factory()->create([
        'title' => 'Inclusive Youth Changes',
        'slug' => 'inclusive-youth-changes',
    ]);
    $imagePath = UploadedFile::fake()->image('child-item.png')->store('infographics', 'public');

    InfographicItem::factory()->create([
        'infographic_id' => $infographic->id,
        'title' => 'Employers Co-contribute',
        'sort_order' => 2,
        'image' => $imagePath,
    ]);

    $response = $this->get(route('infographics.show', $infographic));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('InfographicShow')
        ->where('pageContent.title', 'Our Infographics')
        ->where('infographic.slug', 'inclusive-youth-changes')
        ->where('infographic.label', 'Inclusive Youth Changes')
        ->has('infographic.items', 1)
        ->where('infographic.items.0.title', 'Employers Co-contribute')
        ->where('infographic.items.0.sort_order', 2)
    );
});
