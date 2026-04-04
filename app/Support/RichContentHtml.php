<?php

namespace App\Support;

final class RichContentHtml
{
    /**
     * Allowed tags when rendering admin-authored rich HTML on public routes.
     * Must cover TipTap output: column blocks (data-type column-block), tables, etc.
     */
    public const PUBLIC_STRIP_TAGS_ALLOW =
        '<p><br><strong><em><u><s><a><ul><ol><li><h2><h3><blockquote><pre><code><hr><img>'
        .'<div><table><thead><tbody><tfoot><tr><th><td><caption>';

    public static function sanitize(?string $html): ?string
    {
        if ($html === null || $html === '') {
            return null;
        }

        return strip_tags($html, self::PUBLIC_STRIP_TAGS_ALLOW);
    }
}
