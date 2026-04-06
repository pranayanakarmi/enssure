<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('infographics', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('hero_title')->nullable();           // custom hero title for this infographic
            $table->string('banner_image')->nullable();         // custom banner for this infographic
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();                // thumbnail / listing image
            $table->string('url')->nullable();                  // external link
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index('sort_order');
            $table->index('is_published');
        }); 
    }

    public function down(): void
    {
        Schema::dropIfExists('infographics');
    }
};
