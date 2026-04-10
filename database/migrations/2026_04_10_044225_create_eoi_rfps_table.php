<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('eoi_rfps', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // 'eoi' or 'rfp'
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->longText('content')->nullable();
            $table->string('location')->nullable();
            $table->date('deadline')->nullable();
            $table->string('external_url')->nullable(); // external link
            $table->string('status')->default('draft');
            $table->dateTime('published_at')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('eoi_rfps');
    }
};
