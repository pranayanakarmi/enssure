<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InfographicItem extends Model
{
    /** @use HasFactory<\Database\Factories\InfographicItemFactory> */
    use HasFactory;

    protected $fillable = [
        'infographic_id',
        'title',
        'image',
        'sort_order',
    ];

    public function infographic(): BelongsTo
    {
        return $this->belongsTo(Infographic::class);
    }
}
