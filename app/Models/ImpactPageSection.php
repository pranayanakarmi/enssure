<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImpactPageSection extends Model
{
    protected $table = 'impact_page_sections';

    protected $fillable = [
        'title',
        'description',
    ];
}
