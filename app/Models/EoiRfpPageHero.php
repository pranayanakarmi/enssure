<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EoiRfpPageHero extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'title', 'description', 'hero_image'];
}
