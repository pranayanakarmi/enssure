<?php

namespace App\Policies;

class HomeGallerySectionPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_gallery_sections';
    }
}
