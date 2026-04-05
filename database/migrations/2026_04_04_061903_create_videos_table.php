<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('video_url');          // YouTube, Vimeo, or direct MP4 URL
            $table->string('thumbnail')->nullable(); // optional manual thumbnail
            $table->date('date')->nullable();     // display date
            $table->integer('order')->default(0); // sort order
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('videos');
    }
};
