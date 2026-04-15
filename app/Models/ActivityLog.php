<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\MassPrunable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ActivityLog extends Model
{
    use MassPrunable;

    protected $fillable = [
        'actor_id',
        'actor_name',
        'actor_role',
        'event',
        'description',
        'subject_type',
        'subject_id',
        'route_name',
        'method',
        'url',
        'ip_address',
        'user_agent',
        'properties',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'properties' => 'array',
        ];
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    public function subject(): MorphTo
    {
        return $this->morphTo();
    }

    public function prunable(): Builder
    {
        return static::query()->where('created_at', '<', now()->subDays(config('activity_log.retention_days', 365)));
    }
}
