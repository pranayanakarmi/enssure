<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class HomeImpactStoriesSection extends Model
{
    protected $fillable = [
        'badge_text',
        'title',
        'description',
        'cta_text',
        'cta_url',
    ];

    public function impactStories(): BelongsToMany
    {
        return $this->belongsToMany(ImpactStory::class, 'home_impact_stories_section_impact_story')
            ->withPivot('order')
            ->orderByPivot('order');
    }
}
