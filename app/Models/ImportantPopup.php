<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImportantPopup extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'cta_text',
        'cta_url',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
