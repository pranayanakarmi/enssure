<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Single-row anchor for contact-page feedback rows (required non-null morph on feedback table).
     */
    public function up(): void
    {
        Schema::create('public_contact_feedback_sources', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        DB::table('public_contact_feedback_sources')->insert([
            'id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('public_contact_feedback_sources');
    }
};
