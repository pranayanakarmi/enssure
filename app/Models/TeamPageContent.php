<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamPageContent extends Model
{
    protected $table = 'team_page_content';

    protected $fillable = [
        'title',
        'description',
        'banner_image',
    ];
}
