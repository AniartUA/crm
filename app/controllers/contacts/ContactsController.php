<?php namespace App\Controllers;

use Breadcrumbs, View, Lang, URL;
use \App\Models\ContactRepository;
use \App\Models\MediaTypeRepository;

class ContactsController extends \BaseController
{
	protected $contacts;
	protected $mediaTypes;
	 
	public function __construct(ContactRepository $contacts, MediaTypeRepository $mediaTypes)
	{
		$this->contacts = $contacts;
		$this->mediaTypes = $mediaTypes;	
	}
	
	public function index()
	{
		$this->initBreadcrumbs();
		return View::make('main.contacts.index');
	}
	
	public function create()
	{
		$this->initBreadcrumbs();
		Breadcrumbs::register('contacts.create', function($breadcrumbs){
			$breadcrumbs->parent('contacts.index');
			$breadcrumbs->push('Создание контакта', URL::route('contacts.edit'));
		});

        $mediaTypes = $this->mediaTypes->getAll();

		return View::make('main.contacts.edit', compact('mediaTypes'));
	}
	
	public function show()
	{
		
	}
	
	public function edit()
	{
		
	}
	
	protected function initBreadcrumbs()
	{
		Breadcrumbs::register('contacts.index', function($breadcrumbs){
			$breadcrumbs->parent('index'); //composers.php
			$breadcrumbs->push(Lang::get('views/main.contacts'), URL::route('contacts.index'));
		});
	}
}
?>