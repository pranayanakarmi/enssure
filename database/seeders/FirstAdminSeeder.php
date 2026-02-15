<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FirstAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Creates a super_admin user when FIRST_ADMIN_EMAIL is set in .env.
     */
    public function run(): void
    {
        $email = env('FIRST_ADMIN_EMAIL');
        $password = env('FIRST_ADMIN_PASSWORD', 'password');

        if (! $email) {
            return;
        }

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => env('FIRST_ADMIN_NAME', 'Super Admin'),
                'password' => Hash::make($password),
            ]
        );

        if (! $user->hasRole('super_admin')) {
            $user->assignRole('super_admin');
        }
    }
}
