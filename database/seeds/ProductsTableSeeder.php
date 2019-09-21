<?php

use App\Product;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'name' => 'Droplet 1GB',
            'description' => '1GB / 1 CPU, 25GB SSD Disk, 1000GB Transfer',
            'provider' => 'Digital Ocean',
            'quantity' => 1,
            'price_per_unit' => 10,
            'frequency' => 'monthly',
        ]);
        Product::create([
            'name' => 'Droplet 2GB',
            'description' => '2GB / 1 CPU, 50GB SSD Disk, 2TB Transfer',
            'provider' => 'Digital Ocean',
            'quantity' => 1,
            'price_per_unit' => 20,
            'frequency' => 'monthly',
        ]);
        Product::create([
            'name' => 'Droplet 3GB',
            'description' => '3GB / 1 CPU, 60GB SSD Disk, 3TB Transfer',
            'provider' => 'Digital Ocean',
            'quantity' => 1,
            'price_per_unit' => 30,
            'frequency' => 'monthly',
        ]);
        Product::create([
            'name' => 'Droplet 2GB',
            'description' => '2GB / 2 CPUs, 60GB SSD Disk, 3TB Transfer',
            'provider' => 'Digital Ocean',
            'quantity' => 1,
            'price_per_unit' => 30,
            'frequency' => 'monthly',
        ]);
        Product::create([
            'name' => 'Droplet 1GB',
            'description' => '1GB / 3 CPUs, 60GB SSD Disk, 3TB Transfer',
            'provider' => 'Digital Ocean',
            'quantity' => 1,
            'price_per_unit' => 30,
            'frequency' => 'monthly',
        ]);

        Product::create([
            'name' => 'Droplet 4GB',
            'description' => '4GB / 2 CPUs, 80GB SSD Disk, 4TB Transfer',
            'provider' => 'Digital Ocean',
            'quantity' => 1,
            'price_per_unit' => 40,
            'frequency' => 'monthly',
        ]);

        Product::create([
            'name' => 'Droplet 8GB',
            'description' => '8GB / 4 CPUs, 160GB SSD Disk, 5TB Transfer',
            'provider' => 'Digital Ocean',
            'quantity' => 1,
            'price_per_unit' => 80,
            'frequency' => 'monthly',
        ]);

        Product::create([
            'name' => 'Email package 1',
            'description' => '1000 Emails',
            'provider' => 'Postmark',
            'quantity' => 1,
            'price_per_unit' => 3,
            'frequency' => 'monthly',
        ]);

        Product::create([
            'name' => 'Email package 2',
            'description' => '2500 Emails',
            'provider' => 'Postmark',
            'quantity' => 1,
            'price_per_unit' => 7,
            'frequency' => 'monthly',
        ]);

        Product::create([
            'name' => 'Email package 3',
            'description' => '5000 Emails',
            'provider' => 'Postmark',
            'quantity' => 1,
            'price_per_unit' => 9,
            'frequency' => 'monthly',
        ]);


        Product::create([
            'name' => 'Email package 4',
            'description' => '10000 Emails',
            'provider' => 'Postmark',
            'quantity' => 1,
            'price_per_unit' => 18,
            'frequency' => 'monthly',
        ]);
        Product::create([
            'name' => 'Backup Pack 1 - daily',
            'description' => 'Retain upto 200GB',
            'provider' => 'Digital Ocean',
            'quantity' => 1,
            'price_per_unit' => 1,
            'frequency' => 'daily',
        ]);
        Product::create([
            'name' => 'Backup Pack 2 - weekly',
            'description' => 'Retain upto 200GB',
            'provider' => 'Digital Ocean',
            'quantity' => 1,
            'price_per_unit' => 4,
            'frequency' => 'weekly',
        ]);

        Product::create([
            'name' => 'Backup Pack 3 - monthly',
            'description' => 'Retain upto 200GB',
            'provider' => 'Digital Ocean',
            'quantity' => 1,
            'price_per_unit' => 10,
            'frequency' => 'monthly',
        ]);
        Product::create([
            'name' => 'SSL Pack 1',
            'description' => 'Monthly renewal',
            'provider' => 'Lets Encrypt',
            'quantity' => 1,
            'price_per_unit' => 5,
            'frequency' => 'monthly',
        ]);
        Product::create([
            'name' => 'SSL Pack 2',
            'description' => 'Yearly renewal',
            'provider' => 'Lets Encrypt',
            'quantity' => 1,
            'price_per_unit' => 49,
            'frequency' => 'annually',
        ]);
        Product::create([
            'name' => 'Analytics Report',
            'description' => 'Google Analytics Report - Notified Daily',
            'provider' => 'Google',
            'quantity' => 1,
            'price_per_unit' => 5,
            'frequency' => 'monthly',
        ]);
        Product::create([
            'name' => 'Analytics Report',
            'description' => 'Google Analytics Report - Notified Weekly',
            'provider' => 'Google',
            'quantity' => 1,
            'price_per_unit' => 3,
            'frequency' => 'monthly',
        ]);
        Product::create([
            'name' => 'Analytics Report',
            'description' => 'Google Analytics Report - Notified Monthly',
            'provider' => 'Google',
            'quantity' => 1,
            'price_per_unit' => 2,
            'frequency' => 'monthly',
        ]);
        Product::create([
            'name' => 'SMS Notifications',
            'description' => 'Pay As you go - Charged Per message',
            'provider' => 'Nexmo',
            'quantity' => 1,
            'price_per_unit' => 0.05,
            'frequency' => 'per_unit',
        ]);

    }
}
