<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('team_members', function (Blueprint $table): void {
            $table->enum('location', [
                'Federal',
                'Koshi Pradesh',
                'Madhesh Pradesh',
                'Bagmati Pradesh',
                'Gandaki Pradesh',
                'Lumbini Pradesh',
                'Karnali Pradesh',
                'Sudurpashchim Pradesh',
            ])->nullable()->after('department');
        });
    }

    public function down(): void
    {
        Schema::table('team_members', function (Blueprint $table): void {
            $table->dropColumn('location');
        });
    }
};
