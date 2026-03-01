<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HomeReachItem extends Model
{
    protected $fillable = [
        'home_reach_section_id',
        'value',
        'suffix',
        'label',
        'image',
        'link_url',
        'order',
    ];

    public function homeReachSection(): BelongsTo
    {
        return $this->belongsTo(HomeReachSection::class);
    }
}
