<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeAboutSection extends Model
{
    protected $fillable = [
        'badge_text',
        'title',
        'body',
        'card_title',
        'content_image',
        'background_image',
        'cta_text',
        'cta_url',
    ];
}
