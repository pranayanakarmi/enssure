<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HomeCoverageSectionItem extends Model
{
    protected $fillable = [
        'home_coverage_section_id',
        'value',
        'label',
        'icon',
        'order',
    ];

    public function homeCoverageSection(): BelongsTo
    {
        return $this->belongsTo(HomeCoverageSection::class);
    }
}
