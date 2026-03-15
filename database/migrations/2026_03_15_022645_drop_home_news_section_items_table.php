<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('home_news_section_items');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('home_news_section_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('home_news_section_id')->constrained()->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->string('image')->nullable();
            $table->string('link_url')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }
};
