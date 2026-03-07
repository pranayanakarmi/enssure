<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeImpactStoriesSection extends Model
{
    protected $fillable = [
        'badge_text',
        'title',
        'description',
        'cta_text',
        'cta_url',
    ];
}
