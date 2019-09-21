<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectProduct extends Model
{

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
