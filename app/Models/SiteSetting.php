<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $table = 'site_settings';

    protected $fillable = [
        'facebook_url',
        'x_url',
        'youtube_url',
        'header_phone_1',
        'header_phone_2',
        'header_fax',
        'header_email',
        'logo_left',
        'logo_center',
        'logo_right',
        'footer_privacy_policy_url',
        'footer_terms_of_service_url',
        'visit_us',
        'working_hours',
        'province_contacts',
    ];

    protected function casts(): array
    {
        return [
            'province_contacts' => 'array',
        ];
    }
}
