<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{config('app.name')}}</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="mobile app development, web development" name="keywords">
    <meta name="description"
          content="We have a long experience in complex application development particularly in the web and mobile device spaces with a strong accent on R&amp;D in open source technologies.">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="57x57" href="/img/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/img/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/img/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/img/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/img/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/img/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/img/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/img/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="/img/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/img/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <meta name="title" content="Salfade Inc | A Software Development Agency">
    <meta name="description" content="We make industry standard Web Applications and Mobile Applications with cutting edge
                                technologies">

    <meta property="og:url" content="https://salfade.com"/>
    <meta property="og:type" content="website"/>
    <meta property="og:title" content="Salfade Inc | A Software Development Agency"/>
    <meta property="og:description"
          content="We make industry standard Web Applications and Mobile Applications with cutting edge technologies"/>
    <meta property="og:image" content="https://salfade.com/themes/bizpage/img/about-plan.jpg"/>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700"
          rel="stylesheet">

    <!-- Bootstrap CSS File -->
    <link href="/themes/bizpage/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Libraries CSS Files -->
    <link href="/themes/bizpage/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="/themes/bizpage/lib/animate/animate.min.css" rel="stylesheet">
    <link href="/themes/bizpage/lib/ionicons/css/ionicons.min.css" rel="stylesheet">
    <link href="/themes/bizpage/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="/themes/bizpage/lib/lightbox/css/lightbox.min.css" rel="stylesheet">

    <!-- Main Stylesheet File -->
    <link href="/themes/bizpage/css/style.css" rel="stylesheet">


    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-122478602-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'UA-122478602-1');
    </script>


</head>

<body>

<!--==========================
  Header
============================-->
<header id="header">
    <div class="container-fluid">

        <div id="logo" class="pull-left">
            {{--<h1><a href="/themes/bizpage/#intro" class="scrollto">Salfade</a></h1>--}}
            {{--<!-- Uncomment below if you prefer to use an image logo -->--}}
            <a href="/"><img src="/img/logo.png" alt="" title=""/></a>
        </div>

        <nav id="nav-menu-container">
            <ul class="nav-menu">
                <li class="menu-active"><a href="#intro">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                {{--<li><a href="#team">Team</a></li>--}}
                {{--<li class="menu-has-children"><a href="">Drop Down</a>--}}
                {{--<ul>--}}
                {{--<li><a href="#">Drop Down 1</a></li>--}}
                {{--<li><a href="#">Drop Down 3</a></li>--}}
                {{--<li><a href="#">Drop Down 4</a></li>--}}
                {{--<li><a href="#">Drop Down 5</a></li>--}}
                {{--</ul>--}}
                {{--</li>--}}
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav><!-- #nav-menu-container -->
    </div>
</header><!-- #header -->

<!--==========================
  Intro Section
============================-->
<section id="intro">
    <div class="intro-container">
        <div id="introCarousel" class="carousel  slide carousel-fade" data-ride="carousel">

            <ol class="carousel-indicators"></ol>

            <div class="carousel-inner" role="listbox">

                <div class="carousel-item active" style='background-image: url("/images/2.jpg")'>
                    <div class="carousel-container">
                        <div class="carousel-content">
                            <h2>We are professional</h2>
                            <p>We make industry standard Web Applications and Mobile Applications with cutting edge
                                technologies</p>
                            <a href="#contact" class="btn-get-started scrollto">Get Started</a>
                        </div>
                    </div>
                </div>

                <div class="carousel-item" style='background-image: url("/images/3.jpg")'>
                    <div class="carousel-container">
                        <div class="carousel-content">
                            <h2>We are dedicated</h2>
                            <p>We focus on User Experience over convenience. We will jump out of the box to make our
                                products more user friendly.</p>
                            <a href="#featured-services" class="btn-get-started scrollto">Get Started</a>
                        </div>
                    </div>
                </div>

                <div class="carousel-item" style='background-image: url("/images/4.jpg")'>
                    <div class="carousel-container">
                        <div class="carousel-content">
                            <h2>We are passionate</h2>
                            <p>We love what we do at Salfade and we dedicate ourselves to make better software.</p>
                            <a href="#featured-services" class="btn-get-started scrollto">Get Started</a>
                        </div>
                    </div>
                </div>

            </div>

            <a class="carousel-control-prev" href="#introCarousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon ion-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>

            <a class="carousel-control-next" href="#introCarousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon ion-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>

        </div>
    </div>
</section><!-- #intro -->

<main id="main">

    <!--==========================
      Featured Services Section
    ============================-->
{{--<section id="featured-services">--}}
{{--<div class="container">--}}
{{--<div class="row">--}}

{{--<div class="col-lg-4 box">--}}
{{--<i class="ion-ios-bookmarks-outline"></i>--}}
{{--<h4 class="title"><a href="">Lorem Ipsum Delino</a></h4>--}}
{{--<p class="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi--}}
{{--sint occaecati cupiditate non provident</p>--}}
{{--</div>--}}

{{--<div class="col-lg-4 box box-bg">--}}
{{--<i class="ion-ios-stopwatch-outline"></i>--}}
{{--<h4 class="title"><a href="">Dolor Sitema</a></h4>--}}
{{--<p class="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea--}}
{{--commodo consequat tarad limino ata</p>--}}
{{--</div>--}}

{{--<div class="col-lg-4 box">--}}
{{--<i class="ion-ios-heart-outline"></i>--}}
{{--<h4 class="title"><a href="">Sed ut perspiciatis</a></h4>--}}
{{--<p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore--}}
{{--eu fugiat nulla pariatur</p>--}}
{{--</div>--}}

{{--</div>--}}
{{--</div>--}}
{{--</section><!-- #featured-services -->--}}

<!--==========================
      About Us Section
    ============================-->
    <section id="about">
        <div class="container">

            <header class="section-header">
                <h3>About Us</h3>
                <p>We are a bunch of passionate developers who wants to make the world a better place. We dedicate
                    ourselves to make software with cutting edge technology.
                    We respect our clients and we give high priority to their ideas. But some times we jump out of the
                    box to deliver what is best for both the client and the end users.
                </p>
            </header>

            <div class="row about-cols">

                <div class="col-md-4 wow fadeInUp">
                    <div class="about-col">
                        <div class="img">
                            <img src="/themes/bizpage/img/about-mission.jpg" alt="" class="img-fluid">
                            <div class="icon"><i class="ion-ios-speedometer-outline"></i></div>
                        </div>
                        <h2 class="title">Our Mission</h2>
                        <p>
                            Spreading the awesomeness of software development with better Code.
                        </p>
                    </div>
                </div>

                <div class="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="about-col">
                        <div class="img">
                            <img src="/themes/bizpage/img/about-plan.jpg" alt="" class="img-fluid">
                            <div class="icon"><i class="ion-ios-list-outline"></i></div>
                        </div>
                        <h2 class="title">Our Plan</h2>
                        <p>
                            Write every line of code as if our life depends on it. Make no mistake.
                        </p>
                    </div>
                </div>

                <div class="col-md-4 wow fadeInUp" data-wow-delay="0.2s">
                    <div class="about-col">
                        <div class="img">
                            <img src="/themes/bizpage/img/about-vision.jpg" alt="" class="img-fluid">
                            <div class="icon"><i class="ion-ios-eye-outline"></i></div>
                        </div>
                        <h2 class="title">Our Vision</h2>
                        <p>
                            To become the Nikola Tesla of Software Development. We ain't afraid of thieves..
                        </p>
                    </div>
                </div>

            </div>

        </div>
    </section><!-- #about -->

    <!--==========================
      Services Section
    ============================-->
    <section id="services">
        <div class="container">

            <header class="section-header wow fadeInUp">
                <h3>Services</h3>
                <p>We offer a variety of services when it comes to software development. Starting from writing software
                    to mentor developers.</p>
            </header>

            <div class="row">

                <div class="col-lg-4 col-md-6 box wow bounceInUp" data-wow-duration="1.4s">
                    <div class="icon"><i class="ion-ios-analytics-outline"></i></div>
                    <h4 class="title">Mentoring</h4>
                    <p class="description">Checkout the Founders mentoring profile at <a
                                href="http://hackhands.com/fawzan/">Pluralsight-HackHands</a></p>
                </div>

                <div class="col-lg-4 col-md-6 box wow bounceInUp" data-wow-duration="1.4s">
                    <div class="icon"><i class="ion-ios-paper-outline"></i></div>
                    <h4 class="title">Web Development</h4>
                    <p class="description">We make better web applications with Open Source Technologies.</p>
                </div>
                <div class="col-lg-4 col-md-6 box wow bounceInUp" data-wow-delay="0.1s" data-wow-duration="1.4s">
                    <div class="icon"><i class="ion-ios-speedometer-outline"></i></div>
                    <h4 class="title">Mobile Development</h4>
                    <p class="description">We love FOSS & we love developing Android applications.</p>
                </div>
                <div class="col-lg-4 col-md-6 box wow bounceInUp" data-wow-delay="0.1s" data-wow-duration="1.4s">
                    <div class="icon"><i class="ion-ios-barcode-outline"></i></div>
                    <h4 class="title">]Testing</h4>
                    <p class="description">We do quality assurance on software. We make sure that you get what our
                        clients pay for.. </p>
                </div>
                <div class="col-lg-4 col-md-6 box wow bounceInUp" data-wow-delay="0.1s" data-wow-duration="1.4s">
                    <div class="icon"><i class="ion-ios-people-outline"></i></div>
                    <h4 class="title">Hosting and Domains</h4>
                    <p class="description">We provide hosting & domain for your websites. Check out our prices for the
                        best offers.</p>
                </div>
                <div class="col-lg-4 col-md-6 box wow bounceInUp" data-wow-duration="1.4s">
                    <div class="icon"><i class="ion-ios-bookmarks-outline"></i></div>
                    <h4 class="title">Tutorials</h4>
                    <p class="description">Checkout our tutorials on how to become a better software developer. Coming
                        Soon..</p>
                </div>
            </div>

        </div>
    </section><!-- #services -->

    <!--==========================
      Call To Action Section
    ============================-->
    <section id="call-to-action" class="wow fadeIn">
        <div class="container text-center">
            <h3>Call To Action</h3>
            <p> Get live help from the Founder at PluralSight. Schedule a session now.</p>
            <a class="cta-btn" href="#contact">Request Mentorship</a>
        </div>
    </section><!-- #call-to-action -->

    <!--==========================
      Skills Section
    ============================-->
{{--<section id="skills">--}}
{{--<div class="container">--}}

{{--<header class="section-header">--}}
{{--<h3>Our Skills</h3>--}}
{{--<p>No one can define their skills with numbers.. But we have faith in ourselves to rate ourselves.</p>--}}
{{--</header>--}}

{{--<div class="skills-content">--}}

{{--<div class="progress">--}}
{{--<div class="progress-bar bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0"--}}
{{--aria-valuemax="100">--}}
{{--<span class="skill">Web Development<i class="val">100%</i></span>--}}
{{--</div>--}}
{{--</div>--}}

{{--<div class="progress">--}}
{{--<div class="progress-bar bg-info" role="progressbar" aria-valuenow="100" aria-valuemin="0"--}}
{{--aria-valuemax="100">--}}
{{--<span class="skill">Mobile Development <i class="val">100%</i></span>--}}
{{--</div>--}}
{{--</div>--}}


{{--<div class="progress">--}}
{{--<div class="progress-bar bg-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0"--}}
{{--aria-valuemax="100">--}}
{{--<span class="skill">Mentoring <i class="val">100%</i></span>--}}
{{--</div>--}}
{{--</div>--}}

{{--<div class="progress">--}}
{{--<div class="progress-bar bg-warning" role="progressbar" aria-valuenow="100" aria-valuemin="0"--}}
{{--aria-valuemax="100">--}}
{{--<span class="skill">Server Configuration <i class="val">=100%</i></span>--}}
{{--</div>--}}
{{--</div>--}}

{{--</div>--}}

{{--</div>--}}
{{--</section>--}}

<!--==========================
      Facts Section
    ============================-->
    <section id="facts" class="wow fadeIn">
        <div class="container">

            <header class="section-header">
                <h3>Facts</h3>
                {{--<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>--}}
            </header>

            <div class="row counters">

                <div class="col-lg-3 col-6 text-center">
                    <span data-toggle="counter-up">120</span>
                    <p>Clients</p>
                </div>

                <div class="col-lg-3 col-6 text-center">
                    <span data-toggle="counter-up">300</span>
                    <p>Projects</p>
                </div>

                <div class="col-lg-3 col-6 text-center">
                    <span data-toggle="counter-up">20</span>
                    <p>Hours Of Support</p>
                </div>

                <div class="col-lg-3 col-6 text-center">
                    <span data-toggle="counter-up">3</span>
                    <p>Hard Workers</p>
                </div>

            </div>


        </div>
    </section><!-- #facts -->

    <!--==========================
      Portfolio Section
    ============================-->
    <section id="portfolio" class="section-bg">
        <div class="container">

            <header class="section-header">
                <h3 class="section-title">Our Portfolio</h3>
            </header>

            <div class="row">
                <div class="col-lg-12">
                    <ul id="portfolio-flters">
                        <li data-filter="*" class="filter-active">All</li>
                        <li data-filter=".filter-app">Mobile</li>
                        <li data-filter=".filter-card">Telco</li>
                        <li data-filter=".filter-web">Web</li>
                    </ul>
                </div>
            </div>

            <div class="row portfolio-container">

                <div class="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp">
                    <div class="portfolio-wrap">
                        <figure>
                            <img src="/themes/bizpage/img/portfolio/web7.png" class="img-fluid" alt="">
                            <a href="/themes/bizpage/img/portfolio/web7.png" data-lightbox="portfolio" data-title="VRV"
                               class="link-preview" title="Preview"><i class="ion ion-eye"></i></a>
                            <a href="#" class="link-details" title="More Details"><i
                                    class="ion ion-android-open"></i></a>
                        </figure>

                        <div class="portfolio-info">
                            <h4><a href="https://rtambharawellness.com">RtambharaWellness</a></h4>
                            <p>Web</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp">
                    <div class="portfolio-wrap">
                        <figure>
                            <img src="/themes/bizpage/img/portfolio/web6.png" class="img-fluid" alt="">
                            <a href="/themes/bizpage/img/portfolio/web6.png" data-lightbox="portfolio" data-title="VRV"
                               class="link-preview" title="Preview"><i class="ion ion-eye"></i></a>
                            <a href="https://vadevalor.com" class="link-details" title="More Details"><i
                                    class="ion ion-android-open"></i></a>
                        </figure>

                        <div class="portfolio-info">
                            <h4><a href="#">Vadevalor</a></h4>
                            <p>Web</p>
                        </div>
                    </div>
                </div>


                <div class="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp">
                    <div class="portfolio-wrap">
                        <figure>
                            <img src="/themes/bizpage/img/portfolio/app8.png" class="img-fluid" alt="">
                            <a href="/themes/bizpage/img/portfolio/app8.png" data-lightbox="portfolio" data-title="VRV"
                               class="link-preview" title="Preview"><i class="ion ion-eye"></i></a>
                            <a href="#" class="link-details" title="More Details"><i
                                        class="ion ion-android-open"></i></a>
                        </figure>

                        <div class="portfolio-info">
                            <h4><a href="https://voluntaryrefundvalue.com">VRV</a></h4>
                            <p>App</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.1s">
                    <div class="portfolio-wrap">
                        <figure>
                            <img src="/themes/bizpage/img/portfolio/web5.png" class="img-fluid" alt="">
                            <a href="/themes/bizpage/img/portfolio/web5.png" class="link-preview"
                               data-lightbox="portfolio" data-title="Web 3" title="Preview"><i class="ion ion-eye"></i></a>
                            <a href="#" class="link-details" title="More Details"><i
                                        class="ion ion-android-open"></i></a>
                        </figure>

                        <div class="portfolio-info">
                            <h4><a href="https://eighteenthirtysix.co.uk">Eighteen Thirtysix</a></h4>
                            <p>Web</p>
                        </div>
                    </div>
                </div>


                <div class="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.1s">
                    <div class="portfolio-wrap">
                        <figure>
                            <img src="/themes/bizpage/img/portfolio/web1.png" class="img-fluid" alt="">
                            <a href="/themes/bizpage/img/portfolio/web1.png" class="link-preview"
                               data-lightbox="portfolio" data-title="Web 3" title="Preview"><i class="ion ion-eye"></i></a>
                            <a href="#" class="link-details" title="More Details"><i
                                        class="ion ion-android-open"></i></a>
                        </figure>

                        <div class="portfolio-info">
                            <h4><a href="https://isabe.org">ISABE</a></h4>
                            <p>Web</p>
                        </div>
                    </div>
                </div>


                <div class="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.1s">
                    <div class="portfolio-wrap">
                        <figure>
                            <img src="/themes/bizpage/img/portfolio/web8.png" class="img-fluid" alt="">
                            <a href="/themes/bizpage/img/portfolio/web8.png" class="link-preview"
                               data-lightbox="portfolio" data-title="Web 3" title="Preview"><i class="ion ion-eye"></i></a>
                            <a href="#" class="link-details" title="More Details"><i
                                    class="ion ion-android-open"></i></a>
                        </figure>

                        <div class="portfolio-info">
                            <h4><a href="https://2019.isabe.org">ISABE 2019</a></h4>
                            <p>Web</p>
                        </div>
                    </div>
                </div>


                <div class="col-lg-4 col-md-6 portfolio-item filter-web filter-card wow fadeInUp" data-wow-delay="0.2s">
                    <div class="portfolio-wrap">
                        <figure>
                            <img src="/themes/bizpage/img/portfolio/web4.jpg" class="img-fluid" alt="">
                            <a href="/themes/bizpage/img/portfolio/web4.jpg" class="link-preview"
                               data-lightbox="portfolio" data-title="App 2" title="Preview"><i class="ion ion-eye"></i></a>
                            <a href="#" class="link-details" title="More Details"><i
                                        class="ion ion-android-open"></i></a>
                        </figure>

                        <div class="portfolio-info">
                            <h4><a href="#">KloudMart</a></h4>
                            <p>App</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp">
                    <div class="portfolio-wrap">
                        <figure>kloudmart
                            <img src="/themes/bizpage/img/portfolio/telco1.png" class="img-fluid" alt="">
                            <a href="/themes/bizpage/img/portfolio/telco1.png" class="link-preview"
                               data-lightbox="portfolio" data-title="Card 2" title="Preview"><i class="ion ion-eye"></i></a>
                            <a href="#" class="link-details" title="More Details"><i
                                        class="ion ion-android-open"></i></a>
                        </figure>

                        <div class="portfolio-info">
                            <h4><a href="http://pinpointlk.com">PinPoint</a></h4>
                            <p>APP</p>
                        </div>
                    </div>
                </div>

                {{--<div class="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.1s">--}}
                {{--<div class="portfolio-wrap">--}}
                {{--<figure>--}}
                {{--<img src="/themes/bizpage/img/portfolio/web2.jpg" class="img-fluid" alt="">--}}
                {{--<a href="/themes/bizpage/img/portfolio/web2.jpg" class="link-preview"--}}
                {{--data-lightbox="portfolio" data-title="Web 2" title="Preview"><i class="ion ion-eye"></i></a>--}}
                {{--<a href="#" class="link-details" title="More Details"><i--}}
                {{--class="ion ion-android-open"></i></a>--}}
                {{--</figure>--}}

                {{--<div class="portfolio-info">--}}
                {{--<h4><a href="#">Web 2</a></h4>--}}
                {{--<p>Web</p>--}}
                {{--</div>--}}
                {{--</div>--}}
                {{--</div>--}}

                {{--<div class="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp" data-wow-delay="0.2s">--}}
                {{--<div class="portfolio-wrap">--}}
                {{--<figure>--}}
                {{--<img src="/themes/bizpage/img/portfolio/app3.jpg" class="img-fluid" alt="">--}}
                {{--<a href="/themes/bizpage/img/portfolio/app3.jpg" class="link-preview"--}}
                {{--data-lightbox="portfolio" data-title="App 3" title="Preview"><i class="ion ion-eye"></i></a>--}}
                {{--<a href="#" class="link-details" title="More Details"><i--}}
                {{--class="ion ion-android-open"></i></a>--}}
                {{--</figure>--}}

                {{--<div class="portfolio-info">--}}
                {{--<h4><a href="#">App 3</a></h4>--}}
                {{--<p>App</p>--}}
                {{--</div>--}}
                {{--</div>--}}
                {{--</div>--}}

                {{--<div class="col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp">--}}
                {{--<div class="portfolio-wrap">--}}
                {{--<figure>--}}
                {{--<img src="/themes/bizpage/img/portfolio/card1.jpg" class="img-fluid" alt="">--}}
                {{--<a href="/themes/bizpage/img/portfolio/card1.jpg" class="link-preview"--}}
                {{--data-lightbox="portfolio" data-title="Card 1" title="Preview"><i class="ion ion-eye"></i></a>--}}
                {{--<a href="#" class="link-details" title="More Details"><i--}}
                {{--class="ion ion-android-open"></i></a>--}}
                {{--</figure>--}}

                {{--<div class="portfolio-info">--}}
                {{--<h4><a href="#">Card 1</a></h4>--}}
                {{--<p>Card</p>--}}
                {{--</div>--}}
                {{--</div>--}}
                {{--</div>--}}

                {{--<div class="col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp" data-wow-delay="0.1s">--}}
                {{--<div class="portfolio-wrap">--}}
                {{--<figure>--}}
                {{--<img src="/themes/bizpage/img/portfolio/card3.jpg" class="img-fluid" alt="">--}}
                {{--<a href="/themes/bizpage/img/portfolio/card3.jpg" class="link-preview"--}}
                {{--data-lightbox="portfolio" data-title="Card 3" title="Preview"><i class="ion ion-eye"></i></a>--}}
                {{--<a href="#" class="link-details" title="More Details"><i--}}
                {{--class="ion ion-android-open"></i></a>--}}
                {{--</figure>--}}

                {{--<div class="portfolio-info">--}}
                {{--<h4><a href="#">Card 3</a></h4>--}}
                {{--<p>Card</p>--}}
                {{--</div>--}}
                {{--</div>--}}
                {{--</div>--}}

                {{--<div class="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.2s">--}}
                {{--<div class="portfolio-wrap">--}}
                {{--<figure>--}}
                {{--<img src="/themes/bizpage/img/portfolio/web1.jpg" class="img-fluid" alt="">--}}
                {{--<a href="/themes/bizpage/img/portfolio/web1.jpg" class="link-preview"--}}
                {{--data-lightbox="portfolio" data-title="Web 1" title="Preview"><i class="ion ion-eye"></i></a>--}}
                {{--<a href="#" class="link-details" title="More Details"><i--}}
                {{--class="ion ion-android-open"></i></a>--}}
                {{--</figure>--}}

                {{--<div class="portfolio-info">--}}
                {{--<h4><a href="#">Web 1</a></h4>--}}
                {{--<p>Web</p>--}}
                {{--</div>--}}
                {{--</div>--}}
                {{--</div>--}}

            </div>

        </div>
    </section><!-- #portfolio -->

    <!--==========================
      Clients Section
    ============================-->
{{--<section id="clients" class="wow fadeInUp">--}}
{{--<div class="container">--}}

{{--<header class="section-header">--}}
{{--<h3>Our Clients</h3>--}}
{{--</header>--}}

{{--<div class="owl-carousel clients-carousel">--}}
{{--<img src="/themes/bizpage/img/clients/client-1.png" alt="">--}}
{{--<img src="/themes/bizpage/img/clients/client-2.png" alt="">--}}
{{--<img src="/themes/bizpage/img/clients/client-3.png" alt="">--}}
{{--<img src="/themes/bizpage/img/clients/client-4.png" alt="">--}}
{{--<img src="/themes/bizpage/img/clients/client-5.png" alt="">--}}
{{--<img src="/themes/bizpage/img/clients/client-6.png" alt="">--}}
{{--<img src="/themes/bizpage/img/clients/client-7.png" alt="">--}}
{{--<img src="/themes/bizpage/img/clients/client-8.png" alt="">--}}
{{--</div>--}}

{{--</div>--}}
{{--</section>--}}
<!-- #clients -->

    <!--==========================
      Clients Section
    ============================-->
    <section id="testimonials" class="section-bg wow fadeInUp">
        <div class="container">

            <header class="section-header">
                <h3>Testimonials</h3>
            </header>

            <div class="owl-carousel testimonials-carousel">

                <div class="testimonial-item">
                    <img src="/themes/bizpage/img/pp.jpeg" class="testimonial-img" alt="">
                    <h3>Abhinav Premnath</h3>
                    <h4>Entrepreneur</h4>
                    <p>
                        <img src="/themes/bizpage/img/quote-sign-left.png" class="quote-sign-left" alt="">
                        Mohammed @ Salfade is a highly skilled developer with extensive knowledge on various
                        technologies.
                        He has proven his skills with high quality delivery for projects undertaken.
                        He is methodical and delivers items in an organised and systematic manner.
                        Highly reliable, Mohammed always works to the agreed schedule and provides prompt updates on a
                        daily basis.
                        He is an excellent communicator. Despite the time difference, Mohammed communicates his intent
                        and delivers daily updates as promised.
                        <img src="/themes/bizpage/img/quote-sign-right.png" class="quote-sign-right" alt="">
                    </p>
                </div>

                <div class="testimonial-item">
                    <img src="/themes/bizpage/img/testimonial-8.jpg" class="testimonial-img" alt="">
                    <h3>Joel Geri</h3>
                    <h4>Entrepreneur</h4>
                    <p>
                        <img src="/themes/bizpage/img/quote-sign-left.png" class="quote-sign-left" alt="">
                        For more than six weeks, Fawzan @ Salfade has helped me out immensely with writing my first
                        android
                        application. His knowledge in the area is very impressive and he always explains things
                        in a way that is easy to understand. without his help and expertise, I never would have been
                        able to learn about things like ORM, XML, and Java in general. He is never far away with an
                        email or helping me through zoom to resolve my issue. If there's something he doesn't know he is
                        honest and finds the answers on his own, or he finds a solution I never would have even
                        considered.when it comes to technical advice His knowledge is among the best of the best.
                        <img src="/themes/bizpage/img/quote-sign-right.png" class="quote-sign-right" alt="">
                    </p>
                </div>

                <div class="testimonial-item">
                    <img src="/themes/bizpage/img/testimonial-6.jpeg" class="testimonial-img" alt="">
                    <h3>Nazeef Farook</h3>
                    <h4>Project Coordinator</h4>
                    <p>
                        <img src="/themes/bizpage/img/quote-sign-left.png" class="quote-sign-left" alt="">
                        Fawzan @ Salfade is one of the best developers among the Etisalat Appzone Mobile App Developer
                        Community
                        during my turner at Etisalat in 2012/2014. His dedications on the Mobile App management,
                        development & Marketing efforts are well appreciated & he was also an Award winning Developer at
                        the Champions Award 2013. Fawzan was a developer who was mentoring other Freshers in helping
                        developing mobile apps & getting them connected to Etisalat Appzone Platform. His participation
                        for the Developer workshops showcased the enthusiasm for new learning. He was also one of the
                        developers who were managing the highest no of mobile apps in Etisalat which made him to become
                        an entrepreneur.
                        <img src="/themes/bizpage/img/quote-sign-right.png" class="quote-sign-right" alt="">
                    </p>
                </div>

                <div class="testimonial-item">
                    <img src="/themes/bizpage/img/testimonial-9.png" class="testimonial-img" alt="">
                    <h3>Anthony Whitaker</h3>
                    <h4>Developer</h4>
                    <p>
                        <img src="/themes/bizpage/img/quote-sign-left.png" class="quote-sign-left" alt="">
                        Mohamed saved me hours of effort in 8 minutes. He knew about the specific feature I needed help
                        with and also knew that it was not mentioned in the SendGrid documentation. Which explains why I
                        couldn't find the answer despite my searching the docs. He was also professional and
                        considerate. Recommended.
                        <img src="/themes/bizpage/img/quote-sign-right.png" class="quote-sign-right" alt="">
                    </p>
                </div>

                <div class="testimonial-item">
                    <img src="/themes/bizpage/img/testimonial-7.jpg" class="testimonial-img" alt="">
                    <h3>Elisha Dumas</h3>
                    <h4>Co-Owner, Voluntary Refund Value LLC.</h4>
                    <p>
                        <img src="/themes/bizpage/img/quote-sign-left.png" class="quote-sign-left" alt="">
                        Mr. Mohamed Fawzan @ Salfade is a gifted programmer. Mohamed takes pride in his work, and if
                        there are any
                        issues, he's very tenacious to resolve them quickly. Mohamed redesigned our back-end and
                        optimized our app so that it is up to standards. I'm very thankful and pleased with his work.
                        Mohamed will not disappoint you!
                        <img src="/themes/bizpage/img/quote-sign-right.png" class="quote-sign-right" alt="">
                    </p>
                </div>
                <div class="testimonial-item">
                    <img src="https://secure.gravatar.com/avatar/78350df9be902eb31313ff8d832f03a0?s=400&d=https%3A%2F%2Fmentors-api-prod.s3.amazonaws.com%2Fstatic%2Favatar%2Favatar_large.jpg"
                         class="testimonial-img" alt="">
                    <h3>Ryan Kulp</h3>
                    <h4>Entrepreneur</h4>
                    <p>
                        <img src="/themes/bizpage/img/quote-sign-left.png" class="quote-sign-left" alt="">
                        Mohamed kicks ass -- he helped debug my problem, which had already cost us $5,000(!), in under 1
                        hour. Highly recommend!
                        <img src="/themes/bizpage/img/quote-sign-right.png" class="quote-sign-right" alt="">
                    </p>
                </div>

            </div>

        </div>
    </section>
    <!-- #testimonials -->

    <!--==========================
      Team Section
    ============================-->
{{--<section id="team">--}}
{{--<div class="container">--}}
{{--<div class="section-header wow fadeInUp">--}}
{{--<h3>Team</h3>--}}
{{--<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>--}}
{{--</div>--}}

{{--<div class="row">--}}

{{--<div class="col-lg-3 col-md-6 wow fadeInUp">--}}
{{--<div class="member">--}}
{{--<img src="/themes/bizpage/img/team-1.jpg" class="img-fluid" alt="">--}}
{{--<div class="member-info">--}}
{{--<div class="member-info-content">--}}
{{--<h4>Walter White</h4>--}}
{{--<span>Chief Executive Officer</span>--}}
{{--<div class="social">--}}
{{--<a href=""><i class="fa fa-twitter"></i></a>--}}
{{--<a href=""><i class="fa fa-facebook"></i></a>--}}
{{--<a href=""><i class="fa fa-google-plus"></i></a>--}}
{{--<a href=""><i class="fa fa-linkedin"></i></a>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}

{{--<div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">--}}
{{--<div class="member">--}}
{{--<img src="/themes/bizpage/img/team-2.jpg" class="img-fluid" alt="">--}}
{{--<div class="member-info">--}}
{{--<div class="member-info-content">--}}
{{--<h4>Sarah Jhonson</h4>--}}
{{--<span>Product Manager</span>--}}
{{--<div class="social">--}}
{{--<a href=""><i class="fa fa-twitter"></i></a>--}}
{{--<a href=""><i class="fa fa-facebook"></i></a>--}}
{{--<a href=""><i class="fa fa-google-plus"></i></a>--}}
{{--<a href=""><i class="fa fa-linkedin"></i></a>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}

{{--<div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.2s">--}}
{{--<div class="member">--}}
{{--<img src="/themes/bizpage/img/team-3.jpg" class="img-fluid" alt="">--}}
{{--<div class="member-info">--}}
{{--<div class="member-info-content">--}}
{{--<h4>William Anderson</h4>--}}
{{--<span>CTO</span>--}}
{{--<div class="social">--}}
{{--<a href=""><i class="fa fa-twitter"></i></a>--}}
{{--<a href=""><i class="fa fa-facebook"></i></a>--}}
{{--<a href=""><i class="fa fa-google-plus"></i></a>--}}
{{--<a href=""><i class="fa fa-linkedin"></i></a>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}

{{--<div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">--}}
{{--<div class="member">--}}
{{--<img src="/themes/bizpage/img/team-4.jpg" class="img-fluid" alt="">--}}
{{--<div class="member-info">--}}
{{--<div class="member-info-content">--}}
{{--<h4>Amanda Jepson</h4>--}}
{{--<span>Accountant</span>--}}
{{--<div class="social">--}}
{{--<a href=""><i class="fa fa-twitter"></i></a>--}}
{{--<a href=""><i class="fa fa-facebook"></i></a>--}}
{{--<a href=""><i class="fa fa-google-plus"></i></a>--}}
{{--<a href=""><i class="fa fa-linkedin"></i></a>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}

{{--</div>--}}

{{--</div>--}}
{{--</section><!-- #team -->--}}

<!--==========================
      Contact Section
    ============================-->
    <section id="contact" class="section-bg wow fadeInUp">
        <div class="container">

            <div class="section-header">
                <h3>Contact Us</h3>
                <p>Queries or Proposals? Drop us a mail. We'd love to hear from you.</p>
            </div>

            <div class="row contact-info">

                <div class="col-md-4">
                    <div class="contact-address">
                        <i class="ion-ios-location-outline"></i>
                        <h3>Address</h3>
                        <address>311/1, Rajasinghapura, Muruthalawa, Kandy, Sri Lanka.</address>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="contact-phone">
                        <i class="ion-ios-telephone-outline"></i>
                        <h3>Phone Number</h3>
                        <p><a href="tel:+94771121195">+94 771 121 195</a></p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="contact-email">
                        <i class="ion-ios-email-outline"></i>
                        <h3>Email</h3>
                        <p><a href="mailto:admin@salfade.com">admin@salfade.com</a></p>
                    </div>
                </div>

            </div>

            <div class="form">
                <div id="sendmessage">Your message has been sent. Thank you!</div>
                <div id="errormessage">Failed to send the message</div>
                <form action="" method="post" role="form" class="contactForm">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <input type="text" name="name" class="form-control" id="name" placeholder="Your Name"
                                   data-rule="minlen:4" data-msg="Please enter at least 4 chars"/>
                            <div class="validation"></div>
                        </div>
                        <div class="form-group col-md-6">
                            <input type="email" class="form-control" name="email" id="email" placeholder="Your Email"
                                   data-rule="email" data-msg="Please enter a valid email"/>
                            <div class="validation"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject"
                               data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject"/>
                        <div class="validation"></div>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" name="message" rows="5" data-rule="required"
                                  data-msg="Please write something for us" placeholder="Message"
                                  id="message"></textarea>
                        <div class="validation"></div>
                    </div>
                    <div class="text-center">
                        <button type="submit" id="contact-form-submit">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    </section><!-- #contact -->

</main>

<!--==========================
  Footer
============================-->
<footer id="footer">
    <div class="footer-top">
        <div class="container">
            <div class="row">

                {{--<div class="col-lg-3 col-md-6 footer-info">--}}
                {{--<h3>BizPage</h3>--}}
                {{--<p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita--}}
                {{--valies darta donna mare fermentum iaculis eu non diam phasellus. Scelerisque felis imperdiet--}}
                {{--proin fermentum leo. Amet volutpat consequat mauris nunc congue.</p>--}}
                {{--</div>--}}

                {{--<div class="col-lg-3 col-md-6 footer-links">--}}
                {{--<h4>Useful Links</h4>--}}
                {{--<ul>--}}
                {{--<li><i class="ion-ios-arrow-right"></i> <a href="#">Home</a></li>--}}
                {{--<li><i class="ion-ios-arrow-right"></i> <a href="#">About us</a></li>--}}
                {{--<li><i class="ion-ios-arrow-right"></i> <a href="#">Services</a></li>--}}
                {{--<li><i class="ion-ios-arrow-right"></i> <a href="#">Terms of service</a></li>--}}
                {{--<li><i class="ion-ios-arrow-right"></i> <a href="#">Privacy policy</a></li>--}}
                {{--</ul>--}}
                {{--</div>--}}

                {{--<div class="col-lg-3 col-md-6 footer-contact">--}}
                {{--<h4>Contact Us</h4>--}}
                {{--<p>--}}
                {{--A108 Adam Street <br>--}}
                {{--New York, NY 535022<br>--}}
                {{--United States <br>--}}
                {{--<strong>Phone:</strong> +1 5589 55488 55<br>--}}
                {{--<strong>Email:</strong> info@example.com<br>--}}
                {{--</p>--}}

                <div class="social-links">
                    {{--<a href="#" class="twitter"><i class="fa fa-twitter"></i></a>--}}
                    <a href="http://facebook.com/salfade" class="facebook"><i class="fa fa-facebook"></i></a>
                    {{--<a href="#" class="instagram"><i class="fa fa-instagram"></i></a>--}}
                    {{--<a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>--}}
                    {{--<a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>--}}
                </div>

                {{--</div>--}}

                {{--<div class="col-lg-3 col-md-6 footer-newsletter">--}}
                {{--<h4>Our Newsletter</h4>--}}
                {{--<p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna veniam enim veniam illum--}}
                {{--dolore legam minim quorum culpa amet magna export quem marada parida nodela caramase seza.</p>--}}
                {{--<form action="" method="post">--}}
                {{--<input type="email" name="email"><input type="submit" value="Subscribe">--}}
                {{--</form>--}}
                {{--</div>--}}

            </div>
        </div>
    </div>

    {{--<div class="container">--}}
    {{--<div class="copyright">--}}
    {{--&copy; Copyright <strong>BizPage</strong>. All Rights Reserved--}}
    {{--</div>--}}
    {{--<div class="credits">--}}
    {{--<!----}}
    {{--All the links in the footer should remain intact.--}}
    {{--You can delete the links only if you purchased the pro version.--}}
    {{--Licensing information: https://bootstrapmade.com/license/--}}
    {{--Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=BizPage--}}
    {{---->--}}
    {{--Best <a href="https://bootstrapmade.com/">Bootstrap Templates</a> by BootstrapMade--}}
    {{--</div>--}}
    {{--</div>--}}
</footer><!-- #footer -->

<a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>

<!-- JavaScript Libraries -->
<script src="/themes/bizpage/lib/jquery/jquery.min.js"></script>
<script src="/themes/bizpage/lib/jquery/jquery-migrate.min.js"></script>
<script src="/themes/bizpage/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/themes/bizpage/lib/easing/easing.min.js"></script>
<script src="/themes/bizpage/lib/superfish/hoverIntent.js"></script>
<script src="/themes/bizpage/lib/superfish/superfish.min.js"></script>
<script src="/themes/bizpage/lib/wow/wow.min.js"></script>
<script src="/themes/bizpage/lib/waypoints/waypoints.min.js"></script>
<script src="/themes/bizpage/lib/counterup/counterup.min.js"></script>
<script src="/themes/bizpage/lib/owlcarousel/owl.carousel.min.js"></script>
<script src="/themes/bizpage/lib/isotope/isotope.pkgd.min.js"></script>
<script src="/themes/bizpage/lib/lightbox/js/lightbox.min.js"></script>
<script src="/themes/bizpage/lib/touchSwipe/jquery.touchSwipe.min.js"></script>
<!-- Contact Form JavaScript File -->
<script src="/themes/bizpage/contactform/contactform.js"></script>


<!-- Template Main Javascript File -->
<script src="/themes/bizpage/js/main.js"></script>
<script src="/js/script.js"></script>
<script src="js/app.js"></script>


</body>
</html>
