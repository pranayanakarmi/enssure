<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImpactPageHero extends Model
{
    protected $table = 'impact_page_hero';

    protected $fillable = [
        'title',
        'hero_image',
    ];
}
