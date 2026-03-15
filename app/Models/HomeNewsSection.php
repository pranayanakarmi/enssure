<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class HomeNewsSection extends Model
{
    protected $fillable = [
        'badge_text',
        'title',
        'description',
        'cta_text',
        'cta_url',
    ];

    public function notices(): BelongsToMany
    {
        return $this->belongsToMany(Notice::class, 'home_news_section_notice')
            ->withPivot('order')
            ->orderByPivot('order');
    }
}
