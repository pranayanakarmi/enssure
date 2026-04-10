<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EoiRfpDocument extends Model
{
    use HasFactory;

    protected $fillable = ['eoi_rfp_id', 'label', 'file_path', 'original_name', 'order'];
}
