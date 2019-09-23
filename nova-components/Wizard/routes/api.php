<?php

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Tool API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your tool. These routes
| are loaded by the ServiceProvider of your tool. They are protected
| by your tool's "Authorize" middleware by default. Now, go build!
|
*/

Route::get('/email', function (Request $request) {
    $query = Product::select('name as label', 'description as value')->where('category', '=', 'Email')->get();
    return $query;
});

Route::get('/sms', function (Request $request) {
    $query = Product::select('name as label', 'description as value')->where('category', '=', 'SMS')->get();
    return $query;
});
