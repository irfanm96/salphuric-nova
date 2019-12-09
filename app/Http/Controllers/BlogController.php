<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Wink\WinkPost;

class BlogController extends Controller
{
    public function index()
    {
//        $posts = WinkPost::with('tags')
//            ->live()
//            ->publish()
//            ->having('publish', function ($q) {
//                $q->where('is_published', true);
//            })
//            ->orderBy('publish_date', 'DESC')
//            ->simplePaginate(12);


        $posts = \App\WinkPost::whereHas('publish', function ($q) {
                        $q->where('is_published', true);
                })
                ->orderBy('publish_date', 'DESC')
                ->simplePaginate(12);


        return view('blog.index', [
            'posts' => $posts
        ]);
    }

    public function show($uuid)
    {
        $post = WinkPost::findOrFail($uuid);
        return view('blog.single', [
            'post' => $post
        ]);
    }
}
