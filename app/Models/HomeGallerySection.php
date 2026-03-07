<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HomeGallerySection extends Model
{
    protected $fillable = [
        'badge_text',
        'title',
        'description',
        'cta_text',
        'cta_url',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(HomeGallerySectionItem::class)->orderBy('order');
    }
}
