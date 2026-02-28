<?php

namespace App\Policies;

class MenuItemPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'menu_items';
    }
}
