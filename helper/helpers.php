<?php

function mediumish_path($path)
{
    return asset('/themes/mediumis/' . $path);

}

function satrtbootstrap_path($path)
{
    return asset('/themes/start-bootstrap/' . $path);

}

function pretty_date($date){

    return \Carbon\Carbon::parse($date)->format('Y-M-d');

}


function gravatar($email, $size = 100)
{
    $hash = md5(strtolower(trim($email)));
    $gravatar_url = "https://www.gravatar.com/avatar/" . $hash . "?s=" . $size;

    return $gravatar_url;
}
