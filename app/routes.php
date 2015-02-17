<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('{html_file}', function(){
	$filepath = $_SERVER['DOCUMENT_ROOT'].str_replace('/public', '', $_SERVER['REDIRECT_URL']);
	return file_get_contents($filepath);
})->where('html_file', '.*.html');

Route::get('/', array('as' => 'index', function(){
	return View::make('layouts.main');
}));

//api v1 group
Route::group(array('prefix' => 'api/v1'), function(){
    Route::post('auth', array('uses' => 'App\Controllers\Api\V1\AuthController@auth', 'as' => 'api.auth.auth'));
    Route::resource('contacts', 'App\Controllers\Api\V1\ContactsController');
    Route::resource('users', array('App\Controllers\Api\V1\UsersController'));
});

//public group
Route::group(array(), function(){
    //routes for Settings
    Route::get('/settings', array('uses' => 'App\Controllers\Settings\SettingsController@index', 'as' => 'settings.index'));
    Route::resource(
        '/settings/mediatypes', 'App\Controllers\Settings\MediaTypesController',
        array('only' => array('index', 'store', 'create', 'update', 'destroy'))
    );

    //routes for Auth
    Route::get('/auth', array('uses' => 'App\Controllers\AuthController@getAuthForm', 'as' => 'auth.getForm'));
    Route::post('/auth', array('uses' => 'App\Controllers\AuthController@postAuthForm', 'as' => 'auth.postForm'));

    //routes for Contacts
    Route::resource('/contacts', 'App\Controllers\ContactsController');

    //routes for Files
    Route::resource('/files', 'App\Controllers\FilesController');

    //routes for Tests
    Route::get('/tests/{name?}', array('uses' => 'App\Controllers\TestsController@index', 'as' => 'tests.index'));
});

