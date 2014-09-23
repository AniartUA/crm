<?php 

/*
Route::get('contacts/import', array('uses' => 'App\Modules\Contacts\Controllers\ContactsController@import', 'as' => 'contacts.import'));
Route::post('contacts/import', array('uses' => 'App\Modules\Contacts\Controllers\ContactsController@import', 'as' => 'contacts.import'));
Route::post('contacts/filter', array('uses' => 'App\Modules\Contacts\Controllers\ContactsController@filter', 'as' => 'contacts.filter'));
Route::resource('contacts', 'App\Modules\Contacts\Controllers\ContactsController');
*/

Route::get('/contacts', array('uses' => 'App\Modules\Contacts\Controllers\ContactsIndexController@show', 'as' => 'contacts.index'));
Route::get('/contacts/store', array('uses' => 'App\Modules\Contacts\Controllers\ContactsIndexController@store', 'as' => 'contacts.store'));
Route::get('/contacts/{id}/edit', array('uses' => 'App\Modules\Contacts\Controllers\ContactsEditController@show', 'as' => 'contacts.edit', function($id = 0){
	return $id;
}));
?>