<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VacancyApplication extends Model
{
    protected $fillable = [
        'vacancy_id',
        'name',
        'email',
        'phone',
        'cover_letter',
        'resume_path',
    ];

    /**
     * @return BelongsTo<Vacancy, $this>
     */
    public function vacancy(): BelongsTo
    {
        return $this->belongsTo(Vacancy::class);
    }
}
