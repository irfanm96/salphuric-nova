<?php

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
    $query = Product::select('name as label', 'description as value', 'id')->where('category', '=', 'Email')->get();
    return $query;
});
Route::get('/fetch', function (Request $request) {
    $query = Product::all()->groupBy('category');
    return $query;
});

Route::post('/create-project', function (Request $request) {

//    dd();
    $project_data = $request->input('project');
    $products = $request->input('products');

    $types = $project_data['type'];

    $type = '';
    foreach ($types as $t) {
        $type .= $t['name'] . ' ';
    }

    $project = \App\Project::create([
        'user_id' => (Auth::user())->id,
        'name' => $project_data['name'],
        'description' => $project_data['description'],
        'domain' => $project_data['domain'],
        'type' => $type,
    ]);

//    foreach ($products as $product) {
//        $project->projectProducts()->product()->create($product);
//    }
    return $project;

});
