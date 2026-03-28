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
            $table->string('slug')->nullable()->after('title');
        });

        foreach (DB::table('infographics')->orderBy('id')->get() as $row) {
            $base = Str::slug($row->title) ?: 'infographic';
            $slug = $base;
            $suffix = 1;
            while (DB::table('infographics')->where('slug', $slug)->exists()) {
                $slug = $base.'-'.$suffix;
                $suffix++;
            }
            DB::table('infographics')->where('id', $row->id)->update(['slug' => $slug]);
        }

        Schema::table('infographics', function (Blueprint $table) {
            $table->unique('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('infographics', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn('slug');
        });
    }
};
