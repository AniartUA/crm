<?php namespace App\Modules\Contacts\Controllers;

use Breadcrumbs, View, Route, URL, App;
use App\Modules\Contacts\Models\Contact as Contact;

class ContactsEditController extends \BaseController
{
	protected $contact;
	
	public function __construct(Contact $contact)
	{
		$this->contact = $contact;
	}
	
	public function show($id)
	{
		$contact = $this->contact;
		if($id > 0){
			$contact = $this->contact->find($id);
		}
		$this->initBreadcrumbs();
		return View::make('contacts::edit', compact('contact'));
	}

	protected function initBreadcrumbs()
	{
		App::make('App\Modules\Contacts\Controllers\ContactsIndexController')->initBreadcrumbs();
		Breadcrumbs::register('contacts.edit', function($breadcrumbs){
			$id = Route::getCurrentRoute()->getParameter('id');
			if($id > 0){
				$pageTitle = 'Редактирование контакта';
			}
			else{
				$pageTitle = 'Новый контакт';
			}
			$breadcrumbs->parent('contacts.index');
			$breadcrumbs->push($pageTitle, URL::route('contacts.edit'));
		});
	}
} 
?>