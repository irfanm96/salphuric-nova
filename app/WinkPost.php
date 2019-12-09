<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WinkPost extends Model
{
    public $incrementing = false;

    public function publish()
    {
        return $this->hasOne(WinkPublish::class);
    }

}
