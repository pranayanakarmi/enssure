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
        Schema::create('footer_columns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('footer_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('footer_column_id')->constrained()->cascadeOnDelete();
            $table->string('label');
            $table->string('url')->default('#');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('header_phone_1')->nullable();
            $table->string('header_phone_2')->nullable();
            $table->string('header_fax')->nullable();
            $table->string('header_email')->nullable();
            $table->string('logo_left')->nullable();
            $table->string('logo_center')->nullable();
            $table->string('logo_right')->nullable();
            $table->string('footer_privacy_policy_url')->nullable();
            $table->string('footer_terms_of_service_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('x_url')->nullable();
            $table->string('youtube_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('footer_links');
        Schema::dropIfExists('footer_columns');
        Schema::dropIfExists('site_settings');
    }
};
