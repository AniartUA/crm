<?php namespace App\Controllers;

use App\Models\AppResponse;
use App\Models\Contact;
use App\Models\ContactJSModelConverter;
use App\Services\ContactsService;
use Breadcrumbs, View, Lang, URL;
use \App\Models\MediaTypeRepository;
use Illuminate\Support\Facades\Response;

class ContactsController extends \BaseController
{

    protected $contactService;
    protected $mediaTypes;
	 
	public function __construct(ContactsService $contactService, MediaTypeRepository $mediaTypes)
	{
        $this->contactService = $contactService;
        $this->mediaTypes = $mediaTypes;
	}
	
	public function index()
	{
		$this->initBreadcrumbs();
        $contacts = $this->contactService->getRepository()->orderByUpdated_At('desc')->paginate()->toJson();
 		return View::make('main.contacts.index', compact('contacts'));
	}

    public function store()
    {
        $jsModelConverter = new ContactJSModelConverter(\Input::all());
        if(!($contact = $this->contactService->createContact($jsModelConverter->convert()))){
            $errors = $this->contactService->getErrorsAsArray();
            $errors['loader'] = true;
            return AppResponse::error($errors, 'Ошибка создания контакта', 422);
        }
        else{
            //load nested entities
            $contact->load('phones', 'emails', 'messengers', 'files');
            $contact->setAttribute('loader', true);
            return AppResponse::success($contact->toArray(), 'Контакт успешно создан');
        }
    }

    public function update()
    {
        $jsModelConverter = new ContactJSModelConverter(\Input::all());
        $contactFields = $jsModelConverter->convert();
        if($contact = $this->contactService->updateContact($contactFields['id'], $contactFields)){
            $contact->load('phones', 'emails', 'messengers', 'files');
            $contact->setAttribute('loader', true);
            return AppResponse::success($contact->toArray(), 'Контакт успешно обновлен');
        }

        $errors = $this->contactService->getErrorsAsArray();
        $errors['loader'] = true;
        return AppResponse::error($errors, 'Ошибка обновления контакта', 422);
    }
	
	public function create()
	{
		$this->initBreadcrumbs();
		Breadcrumbs::register('contacts.create', function($breadcrumbs){
			$breadcrumbs->parent('contacts.index');
			$breadcrumbs->push('Создание контакта', URL::route('contacts.edit'));
		});

        $mediaTypes = $this->mediaTypes->get();

		return View::make('main.contacts.edit', compact('mediaTypes'));
	}

    public function edit($contactId)
    {
        $contact = $this->contactService->getRepository()->find($contactId);
        $this->initBreadcrumbs();
        Breadcrumbs::register('contacts.edit', function ($breadcrumbs) use ($contact){
            $breadcrumbs->parent('contacts.index');
            if($contact){
                $name = $contact->name;
            }
            else{
                $name = 'Контакт не найден';
            }
            $breadcrumbs->push($name);
        });

        //TODO сделать страничку если контакт не найден
        if($contact) {
            $mediaTypes = $this->mediaTypes->all();
            $contactData = $contact->toJson();
            return View::make('main.contacts.edit', compact('mediaTypes', 'contactData'));
        }
    }
	
	public function show()
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