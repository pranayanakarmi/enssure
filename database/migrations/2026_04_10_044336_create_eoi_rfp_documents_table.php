<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('eoi_rfp_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('eoi_rfp_id')->constrained()->onDelete('cascade');
            $table->string('label')->nullable();
            $table->string('file_path');
            $table->string('original_name');
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('eoi_rfp_documents');
    }
};
