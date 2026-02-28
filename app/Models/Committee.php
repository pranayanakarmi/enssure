<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Committee extends Model
{
    protected $fillable = [
        'name',
        'committee_type',
        'description',
        'formation_date',
    ];

    protected function casts(): array
    {
        return [
            'formation_date' => 'date',
        ];
    }

    public function members(): HasMany
    {
        return $this->hasMany(CommitteeMember::class, 'committee_id')->orderBy('order');
    }
}
