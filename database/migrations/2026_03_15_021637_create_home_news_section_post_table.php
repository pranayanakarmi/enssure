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
        Schema::dropIfExists('home_news_section_post');

        Schema::create('home_news_section_post', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('home_news_section_id');
            $table->unsignedBigInteger('post_id');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();

            $table->foreign('home_news_section_id', 'home_news_sec_section_fk')
                ->references('id')->on('home_news_sections')->cascadeOnDelete();
            $table->foreign('post_id', 'home_news_sec_post_fk')
                ->references('id')->on('posts')->cascadeOnDelete();
            $table->unique(['home_news_section_id', 'post_id'], 'home_news_sec_post_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_news_section_post');
    }
};
