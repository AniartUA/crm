<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 02.02.15
 * Time: 0:14
 */

namespace App\Controllers;


class AuthController extends \BaseController
{
    public function getAuthForm()
    {
        return \View::make('default.login');
    }

    public function postAuthForm()
    {
        //delegate to default api function
        $request = \Request::create(\URL::route('api.auth.auth'), 'POST', \Input::all());

        return \Route::dispatch($request);
    }
}