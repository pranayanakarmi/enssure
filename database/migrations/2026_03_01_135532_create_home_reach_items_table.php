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
        Schema::create('home_reach_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('home_reach_section_id')->constrained()->cascadeOnDelete();
            $table->string('value')->nullable();
            $table->string('suffix')->nullable();
            $table->string('label')->nullable();
            $table->string('image')->nullable();
            $table->string('link_url')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_reach_items');
    }
};
