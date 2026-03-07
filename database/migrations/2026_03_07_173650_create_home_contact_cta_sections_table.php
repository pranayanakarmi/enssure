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
        Schema::create('home_contact_cta_sections', function (Blueprint $table) {
            $table->id();
            $table->string('badge_text')->nullable();
            $table->longText('title')->nullable();
            $table->string('highlight_phrase')->nullable();
            $table->string('button_text')->nullable();
            $table->string('background_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_contact_cta_sections');
    }
};
