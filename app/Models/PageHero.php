<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageHero extends Model
{
    protected $table = 'page_hero';

    protected $fillable = [
        'hero_image',
    ];
}
