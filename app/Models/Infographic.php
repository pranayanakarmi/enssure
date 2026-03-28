<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Infographic extends Model
{
    /** @use HasFactory<\Database\Factories\InfographicFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
    ];

    public function displayLabel(): string
    {
        if (filled($this->title)) {
            return $this->title;
        }

        return Str::headline($this->slug);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function items(): HasMany
    {
        return $this->hasMany(InfographicItem::class)->orderBy('sort_order')->orderBy('id');
    }

    public static function generateUniqueSlug(string $source, ?int $exceptId = null): string
    {
        $base = Str::slug($source);
        if ($base === '') {
            $base = 'infographic';
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
}
