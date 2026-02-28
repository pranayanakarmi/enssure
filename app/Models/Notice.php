<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notice extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'notice_type',
        'content',
        'attachment',
        'deadline_date',
        'is_featured',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'deadline_date' => 'date',
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
        ];
    }
}
