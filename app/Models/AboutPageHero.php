<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutPageHero extends Model
{
    protected $table = 'about_page_hero';

    protected $fillable = [
        'title',
        'hero_image',
    ];
}
