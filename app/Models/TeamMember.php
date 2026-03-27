<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    public const LOCATIONS = [
        'Federal',
        'Koshi Pradesh',
        'Madhesh Pradesh',
        'Bagmati Pradesh',
        'Gandaki Pradesh',
        'Lumbini Pradesh',
        'Karnali Pradesh',
        'Sudurpashchim Pradesh',
    ];

    protected $fillable = [
        'type',
        'name',
        'job_title',
        'department',
        'location',
        'photo',
        'bio',
        'qualifications',
        'expertise',
        'social_links',
    ];

    protected function casts(): array
    {
        return [
            'social_links' => 'array',
        ];
    }
}
