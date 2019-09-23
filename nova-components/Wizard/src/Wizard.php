<?php

namespace Salfade\Wizard;

use Illuminate\View\View;
use Laravel\Nova\Nova;
use Laravel\Nova\Tool;

class Wizard extends Tool
{
    /**
     * Perform any tasks that need to happen when the tool is booted.
     *
     * @return void
     */
    public function boot()
    {
        Nova::script('wizard', __DIR__ . '/../dist/js/tool.js');
        Nova::style('wizard', __DIR__ . '/../dist/css/tool.css');
    }

    /**
     * Build the view that renders the navigation links for the tool.
     *
     * @return View
     */
    public function renderNavigation()
    {
//        return false;
        return view('wizard::navigation');
    }

}
