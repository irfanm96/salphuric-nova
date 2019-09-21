<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    const HOSTING = 'Hosting';
    const EMAIL = 'Email';
    const SSL = 'SSL';
    const BACKUP = 'Back Up';
    const ANALYTICS = 'Analytics';
    const SMS = 'SMS';

}
