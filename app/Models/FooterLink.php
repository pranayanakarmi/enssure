<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FooterLink extends Model
{
    protected $fillable = [
        'footer_column_id',
        'label',
        'url',
        'order',
    ];

    public function footerColumn(): BelongsTo
    {
        return $this->belongsTo(FooterColumn::class);
    }
}
