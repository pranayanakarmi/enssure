<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeContactCtaSection extends Model
{
    protected $fillable = [
        'badge_text',
        'title',
        'highlight_phrase',
        'button_text',
        'background_image',
    ];
}
