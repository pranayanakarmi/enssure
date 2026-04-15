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
        if (! Schema::hasTable('activity_logs')) {
            Schema::create('activity_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('actor_name')->nullable();
                $table->string('actor_role', 50)->nullable();
                $table->string('event', 100);
                $table->string('description');
                $table->nullableMorphs('subject');
                $table->string('route_name')->nullable();
                $table->string('method', 10)->nullable();
                $table->text('url')->nullable();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->json('properties')->nullable();
                $table->timestamps();

                $table->index(['actor_id', 'created_at']);
                $table->index(['event', 'created_at']);
                $table->index(['subject_type', 'subject_id', 'created_at']);
            });

            return;
        }

        Schema::table('activity_logs', function (Blueprint $table): void {
            if (! Schema::hasColumn('activity_logs', 'actor_id')) {
                $table->foreignId('actor_id')->nullable()->after('id')->constrained('users')->nullOnDelete();
            }
            if (! Schema::hasColumn('activity_logs', 'actor_name')) {
                $table->string('actor_name')->nullable()->after('actor_id');
            }
            if (! Schema::hasColumn('activity_logs', 'actor_role')) {
                $table->string('actor_role', 50)->nullable()->after('actor_name');
            }
            if (! Schema::hasColumn('activity_logs', 'event')) {
                $table->string('event', 100)->nullable()->after('actor_role');
            }
            if (! Schema::hasColumn('activity_logs', 'route_name')) {
                $table->string('route_name')->nullable()->after('subject_id');
            }
            if (! Schema::hasColumn('activity_logs', 'method')) {
                $table->string('method', 10)->nullable()->after('route_name');
            }
            if (! Schema::hasColumn('activity_logs', 'url')) {
                $table->text('url')->nullable()->after('method');
            }
            if (! Schema::hasColumn('activity_logs', 'ip_address')) {
                $table->string('ip_address', 45)->nullable()->after('url');
            }
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Intentionally left blank to avoid destructive rollback on an existing legacy table.
    }
};
