<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('infographics', function (Blueprint $table) {
            $table->string('title')->nullable()->after('slug');
        });

        foreach (DB::table('infographics')->whereNull('title')->cursor() as $row) {
            DB::table('infographics')->where('id', $row->id)->update([
                'title' => Str::headline($row->slug),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('infographics', function (Blueprint $table) {
            $table->dropColumn('title');
        });
    }
};
