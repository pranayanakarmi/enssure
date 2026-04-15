<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'video_url', 'thumbnail', 'date', 'order', 'is_active', 'is_hero',
    ];

    protected $casts = [
        'date' => 'date',
        'is_active' => 'boolean',
        'is_hero' => 'boolean',
    ];

    // Scope for active videos ordered by 'order' column
    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('order');
    }
}
