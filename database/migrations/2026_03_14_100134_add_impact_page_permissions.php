<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $guard = 'web';
        $permissions = [
            'view impact_page_hero',
            'create impact_page_hero',
            'update impact_page_hero',
            'delete impact_page_hero',
            'view impact_page_sections',
            'create impact_page_sections',
            'update impact_page_sections',
            'delete impact_page_sections',
        ];

        foreach ($permissions as $name) {
            DB::table('permissions')->insertOrIgnore([
                'name' => $name,
                'guard_name' => $guard,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $roleIds = DB::table('roles')
            ->whereIn('name', ['admin', 'super_admin'])
            ->where('guard_name', $guard)
            ->pluck('id');

        foreach ($roleIds as $roleId) {
            $existing = DB::table('role_has_permissions')
                ->where('role_id', $roleId)
                ->pluck('permission_id');

            $permissionIds = DB::table('permissions')
                ->whereIn('name', $permissions)
                ->where('guard_name', $guard)
                ->pluck('id');

            foreach ($permissionIds as $permissionId) {
                if (! $existing->contains($permissionId)) {
                    DB::table('role_has_permissions')->insert([
                        'permission_id' => $permissionId,
                        'role_id' => $roleId,
                    ]);
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $permissionIds = DB::table('permissions')
            ->whereIn('name', [
                'view impact_page_hero',
                'create impact_page_hero',
                'update impact_page_hero',
                'delete impact_page_hero',
                'view impact_page_sections',
                'create impact_page_sections',
                'update impact_page_sections',
                'delete impact_page_sections',
            ])
            ->where('guard_name', 'web')
            ->pluck('id');

        DB::table('role_has_permissions')->whereIn('permission_id', $permissionIds)->delete();
        DB::table('permissions')->whereIn('id', $permissionIds)->delete();
    }
};
