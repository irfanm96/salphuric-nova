<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function projectProducts()
    {
        return $this->hasMany(ProjectProduct::class);
    }
}

