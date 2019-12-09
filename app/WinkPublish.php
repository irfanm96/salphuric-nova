<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WinkPublish extends Model
{

    protected $guarded = [];

    public function winkPost()
    {
        return $this->belongsTo(WinkPost::class);
    }
}
