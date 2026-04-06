<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Infographic extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'hero_title', 'slug', 'description', 'image',
        'url', 'meta_title', 'meta_description', 'is_published',
        'sort_order', 'banner_image'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function items()
    {
        return $this->hasMany(InfographicItem::class)->orderBy('sort_order');
    }

    public static function generateUniqueSlug($title, $excludeId = null)
    {
        $slug = Str::slug($title);
        $count = static::where('slug', $slug)
            ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
            ->count();
        return $count ? "{$slug}-{$count}" : $slug;
    }

    public function getBannerUrlAttribute()
    {
        return $this->banner_image ? Storage::disk('public')->url($this->banner_image) : null;
    }

    public function getThumbnailUrlAttribute()
    {
        return $this->image ? Storage::disk('public')->url($this->image) : null;
    }

    public function getPublicUrlAttribute()
    {
        return route('infographics.show', $this->slug);
    }
}
