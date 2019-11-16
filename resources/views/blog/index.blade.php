@extends('blog.layout')

@section('heading')
    <header class="masthead" style="background-image: url('/images/header-blog.jpg')">
        <div class="overlay"></div>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                    <div class="site-heading">
                        <h1>Salfade Blog</h1>
                        <span class="subheading">A series of fortunate events</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
@endsection

@section('content')
    @foreach($posts as $post)
        <div class="post-preview">
            <a href="/blog/{{$post->id}}">
                <h4 class="post-title">
                    {{$post->title}}
                </h4>
                <h4 class="post-subtitle">
                    {{$post->excerpt}}
                </h4>
            </a>
            <p class="post-meta">Posted by
                <a href="#">{{$post->author->name}}</a>
                on {{pretty_date($post->publish_date)}}</p>
        </div>
        <hr>
    @endforeach
@endsection
