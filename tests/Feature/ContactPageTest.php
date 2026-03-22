<?php

test('contact page renders with editable feedback section content', function () {
    $response = $this->get(route('contact'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Contact')
        ->has('contactFeedbackContent')
        ->where('contactFeedbackContent.title', fn ($t) => is_string($t) && $t !== '')
    );
});
