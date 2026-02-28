<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    protected $fillable = [
        'title',
        'authors',
        'publication_type',
        'abstract',
        'content',
        'publication_date',
        'publisher',
        'isbn',
        'doi',
        'file_path',
        'cover_image',
        'download_count',
    ];

    protected function casts(): array
    {
        return [
            'publication_date' => 'date',
        ];
    }
}
