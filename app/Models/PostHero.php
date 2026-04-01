<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostHero extends Model
{
    protected $table = 'post_hero';

    protected $fillable = [
        'hero_image',
    ];
}
