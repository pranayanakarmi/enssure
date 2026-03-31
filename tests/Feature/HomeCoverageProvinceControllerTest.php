<?php

it('returns coverage stats for a known province', function () {
    $response = $this->getJson(route('home.coverage.provinces.show', ['provinceId' => 'koshi']));

    $response
        ->assertSuccessful()
        ->assertJsonPath('id', 'koshi')
        ->assertJsonPath('name', 'Koshi')
        ->assertJsonPath('stats.planned_events', '47')
        ->assertJsonPath('stats.completed_events', '6');

    expect($response->json('stats'))->toBeArray();
});

it('returns not found for an unknown province', function () {
    $response = $this->getJson(route('home.coverage.provinces.show', ['provinceId' => 'unknown-province']));

    $response
        ->assertNotFound()
        ->assertJsonPath('message', 'Province coverage not found.');
});
