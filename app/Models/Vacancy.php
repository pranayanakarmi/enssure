<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Vacancy extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'position_title',
        'slug',
        'job_description',
        'requirements',
        'location',
        'job_type',
        'number_of_positions',
        'application_deadline',
        'application_instructions',
        'tor_file',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'application_deadline' => 'date',
            'published_at' => 'datetime',
        ];
    }

    /**
     * @return HasMany<VacancyApplication, $this>
     */
    public function applications(): HasMany
    {
        return $this->hasMany(VacancyApplication::class);
    }

    /**
     * @return HasMany<VacancyRelatedDocument, $this>
     */
    public function relatedDocuments(): HasMany
    {
        return $this->hasMany(VacancyRelatedDocument::class)->orderBy('order')->orderBy('id');
    }

    /**
     * Vacancies that should appear on the public listing: open, published, and still accepting applications.
     *
     * @param  Builder<static>  $query
     * @return Builder<static>
     */
    public function scopePublishedForPublic(Builder $query): Builder
    {
        return $query->where('status', 'open')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->where(function (Builder $q) {
                $q->whereNull('application_deadline')
                    ->orWhereDate('application_deadline', '>=', now()->toDateString());
            });
    }

    public static function generateUniqueSlug(string $positionTitle, ?int $exceptId = null): string
    {
        $base = Str::slug($positionTitle);
        if ($base === '') {
            $base = 'vacancy';
        }

        $slug = $base;
        $suffix = 1;

        while (static::query()
            ->when($exceptId !== null, fn (Builder $q) => $q->where('id', '!=', $exceptId))
            ->where('slug', $slug)
            ->exists()) {
            $slug = $base.'-'.$suffix;
            $suffix++;
        }

        return $slug;
    }

    protected static function booted(): void
    {
        static::deleting(function (Vacancy $vacancy): void {
            $vacancy->relatedDocuments->each(function (VacancyRelatedDocument $document): void {
                Storage::disk('public')->delete($document->file_path);
            });
        });
    }
}
