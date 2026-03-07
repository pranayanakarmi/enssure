<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HomeGallerySectionItem extends Model
{
    protected $fillable = [
        'home_gallery_section_id',
        'image',
        'text',
        'order',
    ];

    public function homeGallerySection(): BelongsTo
    {
        return $this->belongsTo(HomeGallerySection::class);
    }
}
