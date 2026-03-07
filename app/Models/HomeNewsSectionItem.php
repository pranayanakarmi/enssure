<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HomeNewsSectionItem extends Model
{
    protected $fillable = [
        'home_news_section_id',
        'title',
        'image',
        'link_url',
        'order',
    ];

    public function homeNewsSection(): BelongsTo
    {
        return $this->belongsTo(HomeNewsSection::class);
    }
}
