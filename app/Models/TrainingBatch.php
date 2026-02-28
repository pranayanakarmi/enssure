<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrainingBatch extends Model
{
    protected $table = 'training_batches';

    protected $fillable = [
        'batch_name',
        'batch_code',
        'start_date',
        'end_date',
        'training_center',
        'instructor_name',
        'max_capacity',
        'current_enrollment',
        'status',
        'schedule_details',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(BatchEnrollment::class, 'batch_id');
    }
}
