<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfographicsPageContent extends Model
{
    protected $table = 'infographics_page_content';

    protected $fillable = [
        'title',
        'banner_image',
    ];
}
