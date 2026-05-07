<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'site' => [
            'name' => 'TechNova Labs',
            'tagline' => 'Practical AI, cloud, and product engineering for modern teams.',
        ],
        'stats' => [
            ['label' => 'Projects Delivered', 'value' => '120+'],
            ['label' => 'Countries Served', 'value' => '18'],
            ['label' => 'Uptime Across Platforms', 'value' => '99.95%'],
        ],
        'services' => [
            [
                'title' => 'AI Workflow Automation',
                'description' => 'Design and deploy automations that reduce repetitive operations and speed up delivery.',
            ],
            [
                'title' => 'Cloud Architecture',
                'description' => 'Build secure, scalable infrastructure on modern cloud platforms with observability built in.',
            ],
            [
                'title' => 'Web Product Development',
                'description' => 'Ship high-performance web experiences using Laravel, Inertia, Vue, and API-first design.',
            ],
        ],
        'articles' => [
            [
                'title' => 'How to Choose an AI Use Case That Actually Delivers ROI',
                'category' => 'AI Strategy',
                'readTime' => '6 min read',
            ],
            [
                'title' => 'Zero-Downtime Deployment Patterns for Fast-Moving Teams',
                'category' => 'DevOps',
                'readTime' => '5 min read',
            ],
            [
                'title' => 'Building Trustworthy Dashboards for Executive Decisions',
                'category' => 'Data',
                'readTime' => '7 min read',
            ],
        ],
        'updatedAt' => now()->toDateString(),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
