<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrainingProgram extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'program_type',
        'description',
        'duration',
        'level',
    ];

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
