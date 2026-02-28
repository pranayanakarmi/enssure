<?php

namespace App\Policies;

class GalleryImagePolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'gallery_images';
    }
}
