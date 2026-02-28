<?php

namespace App\Policies;

class GalleryPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'galleries';
    }
}
