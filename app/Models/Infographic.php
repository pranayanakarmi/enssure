<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Infographic extends Model
{
    /** @use HasFactory<\Database\Factories\InfographicFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'sort_order',
    ];
}
