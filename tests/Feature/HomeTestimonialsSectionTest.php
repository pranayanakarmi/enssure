<?php

use App\Models\HomeTestimonialsSection;
use App\Models\Testimonial;
use Inertia\Testing\AssertableInertia as Assert;

test('home page returns testimonials section and published testimonials in display order', function () {
    HomeTestimonialsSection::create([
        'badge_text' => 'Testimonials',
        'title' => 'Voices from the field',
        'description' => 'Stories from participants and employers.',
    ]);

    Testimonial::create([
        'name' => 'Sita Rai',
        'designation' => 'Apprenticeship Graduate',
        'testimonial_text' => 'The work-based training made the transition into paid employment much faster for me.',
        'is_published' => true,
        'order' => 2,
    ]);

    Testimonial::create([
        'name' => 'Hari BK',
        'organization' => 'Machining Cooperative',
        'testimonial_text' => 'Our trainees gained practical confidence, not just classroom knowledge.',
        'is_published' => true,
        'order' => 1,
    ]);

    Testimonial::create([
        'name' => 'Draft Testimonial',
        'designation' => 'Should Not Render',
        'testimonial_text' => 'This testimonial should not be visible on the home page.',
        'is_published' => false,
        'order' => 0,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Welcome')
        ->where('homeTestimonialsSection.badge_text', 'Testimonials')
        ->where('homeTestimonialsSection.title', 'Voices from the field')
        ->where('homeTestimonialsSection.description', 'Stories from participants and employers.')
        ->has('testimonials', 2)
        ->where('testimonials.0.name', 'Hari BK')
        ->where('testimonials.0.quote', 'Our trainees gained practical confidence, not just classroom knowledge.')
        ->where('testimonials.0.role', 'Machining Cooperative')
        ->where('testimonials.1.name', 'Sita Rai')
        ->where('testimonials.1.quote', 'The work-based training made the transition into paid employment much faster for me.')
        ->where('testimonials.1.role', 'Apprenticeship Graduate')
    );
});
