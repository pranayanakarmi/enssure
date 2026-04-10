<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EoiRfp extends Model
{
    use HasFactory;

    protected $fillable = [
        'type', 'title', 'slug', 'description', 'content', 'location',
        'deadline', 'external_url', 'status', 'published_at', 'order'
    ];

    protected $casts = [
        'deadline' => 'date',
        'published_at' => 'datetime',
    ];

    public function documents()
    {
        return $this->hasMany(EoiRfpDocument::class)->orderBy('order');
    }
}
