<?php

use App\Project;
use Illuminate\Database\Seeder;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Project::create([
            'user_id' => 1,
            'name' => 'watering',
            'description' => 'Semester 5 Unite Project',
            'domain' => 'watering.ga',
            'type' => 'web',
        ]);
    }
}
