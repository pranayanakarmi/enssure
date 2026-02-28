<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Feedback extends Model
{
    protected $table = 'feedback';

    protected $fillable = [
        'feedback_type',
        'feedbackable_type',
        'feedbackable_id',
        'name',
        'email',
        'feedback_text',
        'is_public',
        'responded_by',
        'response',
        'responded_at',
    ];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',
            'responded_at' => 'datetime',
        ];
    }

    public function feedbackable(): MorphTo
    {
        return $this->morphTo();
    }

    public function respondedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responded_by');
    }
}
