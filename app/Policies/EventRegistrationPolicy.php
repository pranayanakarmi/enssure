<?php

namespace App\Policies;

class EventRegistrationPolicy extends ContentPolicyBase
{
    protected function resourceName(): string
    {
        return 'event_registrations';
    }
}
