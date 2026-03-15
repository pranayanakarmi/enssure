<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryPageSection extends Model
{
    protected $table = 'gallery_page_section';

    protected $fillable = [
        'title',
        'description',
    ];
}
