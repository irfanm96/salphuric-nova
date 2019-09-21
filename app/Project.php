<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $casts = [
        'type' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function projectProducts()
    {
        return $this->hasMany(ProjectProduct::class);
    }
}
