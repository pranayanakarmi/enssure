<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class HomeGallerySection extends Model
{
    protected $fillable = [
        'badge_text',
        'title',
        'description',
        'cta_text',
        'cta_url',
    ];

    public function galleries(): BelongsToMany
    {
        return $this->belongsToMany(Gallery::class, 'home_gallery_section_gallery')
            ->withPivot('order')
            ->orderByPivot('order');
    }
}
