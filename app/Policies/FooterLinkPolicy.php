<?php

namespace App\Policies;

class FooterLinkPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'footer_links';
    }
}
