<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Beneficiary extends Model
{
    protected $fillable = [
        'full_name',
        'gender',
        'date_of_birth',
        'contact_number',
        'province',
        'district',
        'municipality',
        'completion_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'completion_date' => 'date',
        ];
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(BatchEnrollment::class, 'beneficiary_id');
    }
}
