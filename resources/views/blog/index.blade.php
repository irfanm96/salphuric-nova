@extends('blog.layout')

@section('content')
    @foreach($posts as $post)
        <div class="post-preview">
            <a href="post.html">
                <h4 class="post-title">
                    {{$post->title}}
                </h4>
                <h4 class="post-subtitle">
                    {{$post->excerpt}}
                </h4>
            </a>
            <p class="post-meta">Posted by
                <a href="#">{{$post->author->name}}</a>
                on {{$post->publish_date}}</p>
        </div>
        <hr>
    @endforeach
@endsection
