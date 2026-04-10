<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EoiRfpPermissionSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            'view_eoi_rfp',
            'create_eoi_rfp',
            'update_eoi_rfp',
            'delete_eoi_rfp',
        ];

        foreach ($permissions as $permission) {
            DB::table('permissions')->updateOrInsert(
                ['name' => $permission, 'guard_name' => 'web'],
                ['name' => $permission, 'guard_name' => 'web']
            );
        }
    }
}
