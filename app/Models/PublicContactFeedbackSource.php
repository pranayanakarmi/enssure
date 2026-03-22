<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class PublicContactFeedbackSource extends Model
{
    protected $table = 'public_contact_feedback_sources';

    public function feedback(): MorphMany
    {
        return $this->morphMany(Feedback::class, 'feedbackable');
    }
}
