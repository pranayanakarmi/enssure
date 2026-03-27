<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VacancyRelatedDocument extends Model
{
    protected $fillable = [
        'vacancy_id',
        'file_path',
        'file_name',
        'file_extension',
        'file_size',
        'order',
    ];

    /**
     * @return BelongsTo<Vacancy, $this>
     */
    public function vacancy(): BelongsTo
    {
        return $this->belongsTo(Vacancy::class);
    }
}
