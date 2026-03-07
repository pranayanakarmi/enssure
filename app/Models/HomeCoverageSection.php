<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HomeCoverageSection extends Model
{
    protected $fillable = [
        'badge_text',
        'title',
        'description',
        'map_image',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(HomeCoverageSectionItem::class)->orderBy('order');
    }
}
