<?php

use App\Models\TeamMember;
use App\Models\TeamPageContent;

test('team page returns 200 with team content and member lists', function () {
    $response = $this->get(route('team'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Team')
        ->has('teamContent')
        ->has('executiveMembers')
        ->has('staffMembers')
        ->where('teamContent.title', 'Our Team')
    );
});

test('team page shows content and members from database', function () {
    TeamPageContent::create([
        'title' => 'Our Team',
        'description' => 'Custom intro text.',
        'banner_image' => null,
    ]);

    TeamMember::create([
        'type' => 'executive_committee',
        'name' => 'Jane Chair',
        'job_title' => 'Chairperson',
        'department' => 'Board',
        'location' => 'Federal',
    ]);
    TeamMember::create([
        'type' => 'staff',
        'name' => 'John Staff',
        'job_title' => 'Coordinator',
        'department' => 'Programmes',
        'location' => 'Bagmati Pradesh',
    ]);

    $response = $this->get(route('team'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Team')
        ->where('teamContent.title', 'Our Team')
        ->where('teamContent.description', 'Custom intro text.')
        ->has('executiveMembers', 1)
        ->has('staffMembers', 1)
        ->where('executiveMembers.0.name', 'Jane Chair')
        ->where('executiveMembers.0.job_title', 'Chairperson')
        ->where('executiveMembers.0.department', 'Board')
        ->where('executiveMembers.0.location', 'Federal')
        ->where('staffMembers.0.name', 'John Staff')
        ->where('staffMembers.0.job_title', 'Coordinator')
        ->where('staffMembers.0.department', 'Programmes')
        ->where('staffMembers.0.location', 'Bagmati Pradesh')
    );
});
