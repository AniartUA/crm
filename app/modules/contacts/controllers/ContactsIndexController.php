<?php namespace App\Modules\Contacts\Controllers;

use View, Breadcrumbs, Lang, Url;
use App\Modules\Contacts\Models\Contact as Contact;

class ContactsIndexController extends \BaseController
{
	public function  show()
	{
		$this->initBreadcrumbs();
		return View::make('contacts::index');
	}
	
	public function store()
	{
		$form		= \Input::all();
		$validation	= \Validator::make($form, Contact::getRules());
		
		if($validation->passes()){
			$contact = new Contact();
			$contact->create($form);
			
			return \Redirect::route('contacts.index');
		}
		else{
			return \Redirect::route('contacts.edit')
				->withInput()
				->withErrors();
		}
	}
	
	public function initBreadcrumbs()
	{
		Breadcrumbs::register('contacts.index', function($breadcrumbs){
			$breadcrumbs->parent('index'); //composers.php
			$breadcrumbs->push(Lang::get('views/main.contacts'), URL::route('contacts.index'));
		});
	}
}
?>