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
        Schema::dropIfExists('home_news_section_notice');

        Schema::create('home_news_section_notice', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('home_news_section_id');
            $table->unsignedBigInteger('notice_id');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();

            $table->foreign('home_news_section_id', 'home_news_notice_section_fk')
                ->references('id')->on('home_news_sections')->cascadeOnDelete();
            $table->foreign('notice_id', 'home_news_notice_notice_fk')
                ->references('id')->on('notices')->cascadeOnDelete();
            $table->unique(['home_news_section_id', 'notice_id'], 'home_news_notice_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_news_section_notice');
    }
};
