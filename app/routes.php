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

//routes for Settings
Route::get('/settings', array('uses' => 'App\Controllers\Settings\SettingsController@index', 'as' => 'settings.index'));
Route::resource('settings/mediatypes', 'App\Controllers\Settings\MediaTypesController', array('only' => array('index', 'store', 'create', 'update', 'destroy')));

//routes for Contacts
Route::resource('contacts', 'App\Controllers\ContactsController');