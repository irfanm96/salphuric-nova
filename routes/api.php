<?php

use App\Mail\ContactEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('/contact', function (Request $request) {

    $data = [];
    $data['name'] = $request->input('name');
    $data['email'] = $request->input('email');
    $data['subject'] = $request->input('subject');
    $data['message'] = $request->input('message');


    Mail::to("fawzanm@gmail.com")->send(new ContactEmail($data));

    return "OK";

});
