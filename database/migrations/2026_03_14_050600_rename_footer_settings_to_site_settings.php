<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename('footer_settings', 'site_settings');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('site_settings', 'footer_settings');
    }
};
