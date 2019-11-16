@extends('blog.layout')

@section('heading')
    <header class="masthead" style="background-image: url('/images/header-blog.jpg')">
        <div class="overlay"></div>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                    <div class="post-heading">
                        <h1>{{$post->title}}</h1>
                        <h2 class="subheading">{{$post->excerpt}}</h2>
                        <span class="meta">Posted by
              <a href="#">{{$post->author->name}}</a>
              on {{pretty_date($post->publish_date)}}</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
@endsection

@section('content')
    <!-- Post Content -->
    <article>
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 mx-auto">

                    {{$post->body}}
                </div>
            </div>
        </div>
    </article>

    <hr>
@endsection
