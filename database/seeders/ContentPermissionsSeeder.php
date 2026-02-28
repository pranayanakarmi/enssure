<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ContentPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Creates view/create/update/delete permissions for each content resource
     * and assigns all to super_admin and admin.
     */
    public function run(): void
    {
        $resources = config('admin_content.resources', []);
        $actions = config('admin_content.actions', ['view', 'create', 'update', 'delete']);
        $guard = 'web';

        $permissionNames = [];
        foreach ($resources as $resource) {
            foreach ($actions as $action) {
                $name = "{$action} {$resource}";
                $permissionNames[] = $name;
                Permission::firstOrCreate(
                    ['name' => $name, 'guard_name' => $guard],
                    ['name' => $name, 'guard_name' => $guard]
                );
            }
        }

        foreach (['super_admin', 'admin'] as $roleName) {
            $role = Role::firstWhere(['name' => $roleName, 'guard_name' => $guard]);
            if ($role) {
                $role->syncPermissions(array_merge($role->permissions->pluck('name')->all(), $permissionNames));
            }
        }
    }
}
