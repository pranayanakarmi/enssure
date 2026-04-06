<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class InfographicItem extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'image', 'alt_text', 'sort_order', 'infographic_id'];

    public function infographic()
    {
        return $this->belongsTo(Infographic::class);
    }

    public function getImageUrlAttribute()
    {
        return $this->image ? Storage::disk('public')->url($this->image) : null;
    }
}
