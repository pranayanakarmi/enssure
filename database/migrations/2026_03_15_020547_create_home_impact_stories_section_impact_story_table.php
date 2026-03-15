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
        Schema::dropIfExists('home_impact_stories_section_impact_story');

        Schema::create('home_impact_stories_section_impact_story', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('home_impact_stories_section_id');
            $table->unsignedBigInteger('impact_story_id');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();

            $table->foreign('home_impact_stories_section_id', 'home_impact_sec_section_fk')
                ->references('id')->on('home_impact_stories_sections')->cascadeOnDelete();
            $table->foreign('impact_story_id', 'home_impact_sec_story_fk')
                ->references('id')->on('impact_stories')->cascadeOnDelete();
            $table->unique(['home_impact_stories_section_id', 'impact_story_id'], 'home_impact_sec_story_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_impact_stories_section_impact_story');
    }
};
