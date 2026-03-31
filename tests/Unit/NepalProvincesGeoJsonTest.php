<?php

use Tests\TestCase;

uses(TestCase::class);

test('nepal provinces geojson file is present and valid', function () {
    $path = public_path('enssure/geojson/nepal-provinces.geojson');

    expect(file_exists($path))->toBeTrue();

    $data = json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);

    expect($data)->toBeArray()
        ->and($data['type'] ?? null)->toBe('FeatureCollection')
        ->and($data['features'] ?? null)->toBeArray()->toHaveCount(7);

    $ids = collect($data['features'])->pluck('properties.id')->sort()->values()->all();

    expect($ids)->toBe([
        'bagmati',
        'gandaki',
        'karnali',
        'koshi',
        'lumbini',
        'madhesh',
        'sudurpashchim',
    ]);
});
