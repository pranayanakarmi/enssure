<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImpactStory extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'person_name',
        'person_title',
        'location',
        'story',
        'image',
        'video_url',
        'published_at',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }
}
