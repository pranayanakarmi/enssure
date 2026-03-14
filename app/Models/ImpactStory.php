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
        'person_title',
        'location',
        'story',
        'image',
        'video_url',
    ];
}
