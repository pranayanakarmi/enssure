<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vacancy extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'position_title',
        'slug',
        'job_description',
        'requirements',
        'location',
        'job_type',
        'number_of_positions',
        'application_deadline',
        'application_instructions',
        'tor_file',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'application_deadline' => 'date',
            'published_at' => 'datetime',
        ];
    }
}
