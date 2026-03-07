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
        Schema::create('home_coverage_section_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('home_coverage_section_id')->constrained()->cascadeOnDelete();
            $table->string('value')->nullable();
            $table->string('label')->nullable();
            $table->string('icon')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_coverage_section_items');
    }
};
