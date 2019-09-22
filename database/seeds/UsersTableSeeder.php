<?php

use App\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = Role::create(['name' => 'admin']);
        $role = Role::create(['name' => 'super-admin']);
        $role = Role::create(['name' => 'user']);
        $role = Role::create(['name' => 'manager']);

        User::create([
            'name' => 'Mohamed Fawzan',
            'email' => 'fawzanm@gmail.com',
            'password' => bcrypt('secret'),
            'email_verified_at' => now(),
            'country' => 'LK'
        ])->assignRole('super-admin');


        User::create([
            'name' => 'Mohamed Irfan',
            'email' => 'irfanmm96@gmail.com',
            'password' => bcrypt('secret'),
            'email_verified_at' => now(),
            'country' => 'LK'
        ])->assignRole('super-admin');


        factory(User::class, 20)->create();

    }
}
