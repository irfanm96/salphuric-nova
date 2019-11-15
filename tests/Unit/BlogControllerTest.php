<?php

namespace App\Http\Controllers;


use Tests\TestCase;
use Wink\WinkPost;

class BlogControllerTest extends TestCase
{

    public function testIndex()
    {

        $posts = WinkPost::with('tags')
            ->live()
            ->orderBy('publish_date', 'DESC')
            ->simplePaginate(1);

        dump($posts->first()->author->email);
    }
}
