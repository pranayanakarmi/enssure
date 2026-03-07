<?php

namespace App\Policies;

class HomeGallerySectionItemPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'home_gallery_section_items';
    }
}
