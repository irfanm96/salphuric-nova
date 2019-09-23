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


    public static function getCategories()
    {
        return [
           self::HOSTING => self::HOSTING,
           self::EMAIL => self::EMAIL,
           self::SSL => self::SSL,
           self::BACKUP => self::BACKUP,
           self::ANALYTICS => self::ANALYTICS,
           self::SMS => self::SMS,
        ];

    }

}
