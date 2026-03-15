<?php

namespace App\Policies;

class GalleryPageSectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'gallery_page_section';
    }
}
