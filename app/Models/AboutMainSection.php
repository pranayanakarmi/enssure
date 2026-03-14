<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutMainSection extends Model
{
    protected $fillable = [
        'title',
        'body',
        'content_image',
        'background_image',
        'card_title',
        'cta_text',
        'cta_url',
    ];
}
