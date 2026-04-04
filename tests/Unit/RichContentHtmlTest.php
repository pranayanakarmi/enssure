<?php

use App\Support\RichContentHtml;

test('sanitize returns null for null or empty string', function () {
    expect(RichContentHtml::sanitize(null))->toBeNull();
    expect(RichContentHtml::sanitize(''))->toBeNull();
});

test('sanitize preserves column block wrapper and data attributes', function () {
    $html = '<div data-type="column-block" data-columns="2"><p>Left</p><p>Right</p></div>';

    expect(RichContentHtml::sanitize($html))->toBe($html);
});

test('sanitize strips script and iframe tags', function () {
    $html = '<p>Hi</p><script>alert(1)</script><iframe src="x"></iframe>';

    $out = RichContentHtml::sanitize($html);

    expect($out)->toContain('<p>Hi</p>');
    expect($out)->not->toContain('<script');
    expect($out)->not->toContain('<iframe');
});
