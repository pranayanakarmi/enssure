<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'job_title',
        'department',
        'photo',
        'bio',
        'qualifications',
        'expertise',
        'social_links',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'social_links' => 'array',
        ];
    }
}
