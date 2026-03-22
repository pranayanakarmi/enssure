<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactFeedbackContent extends Model
{
    protected $fillable = [
        'title',
        'description',
    ];
}
