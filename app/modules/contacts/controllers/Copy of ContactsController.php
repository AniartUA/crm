<?php namespace App\Modules\Contacts\Controllers;

use App\Modules\Contacts\Models\Contact as Contact;
use Input, DB, View, Validator, Redirect, Breadcrumbs, URL, Route, Lang;

class ContactsController extends \BaseController 
{
	/**
	 * @var Contact
	 */
	protected $contact;
	/**
	 * @var Illuminate\Routing\Route
	 */
	protected $route;

	public function __construct(Contact $contact)
	{
		$this->route	= Route::current();
		$this->contact	= $contact;
	}
	
	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('contacts::create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$input = Input::all();
		$validation = Validator::make($input, Contact::$rules);

		if ($validation->passes())
		{
			$this->contact->create($input);

			return Redirect::route('contacts.index');
		}

		return Redirect::route('contacts.create')
			->withInput()
			->withErrors($validation)
			->with('message', 'Ошибки валидации.');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$contact = $this->contact->findOrFail($id);

		return View::make('contacts::show', compact('contact'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$contact = $this->contact;
		if($id > 0){
			$contact = $this->contact->find($id);
		}
		Breadcrumbs::register($this->route->getName(), function($breadcrumbs){
			$id = $this->route->getParameter('id');
			if($id > 0){
				$pageTitle = 'Редактирование контакта';
			}
			else{
				$pageTitle = 'Новый контакт';
			}
			$breadcrumbs->parent('index');
			$breadcrumbs->push('Контакты', Route::get);
			$breadcrumbs->push($pageTitle, $this->route->getUri());
		});
		return View::make('contacts::edit', compact('contact'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$validation = Validator::make($input, Contact::$rules);

		if ($validation->passes())
		{
			$contact = $this->contact->find($id);
			$contact->update($input);

			return Redirect::route('contacts.show', $id);
		}

		return Redirect::route('contacts.edit', $id)
			->withInput()
			->withErrors($validation)
			->with('message', 'Ошибки валидации.');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$this->contact->find($id)->delete();

		return Redirect::route('contacts.index');
	}
	
	protected function importFile($filePath)
	{
		if(!file_exists($filePath)){
			return false;
		}
		$fileHandler = fopen($filePath, "r");
		$i = 0;
		while($csvRow = fgetcsv($fileHandler)){
			if($i == 0){
				if(count($csvRow) !== 3){
					return false;
				}
				if($csvRow[0] != 'Название' 
				|| $csvRow[1] != 'Телефон'
				|| $csvRow[2] != 'Пользователь'
				){
					return false;
				}
			}
			else{
				$phones	= explode(',', $csvRow[1]);
				$phone 	= trim($phones[0]);
				if(empty($csvRow[0]) || empty($phone) || empty($csvRow[2])){
					continue;
				}
				$Contact = new Contact;
				$Contact->create(array(
					'name'		=> $csvRow[0],
					'phone'		=> $phone,
					'user_id'	=> $csvRow[2]
				));
			}
			$i++;
		}
		
		return $i;
	}
	
	public function import()
	{
		if(Input::hasFile('import-file')){
			$errors		= array();
			$importFile = Input::file('import-file');
			$resul = 0;
			if($importFile->isValid()){
				if($importFile->getClientOriginalExtension() == 'csv'){
					$filePath = $_SERVER['DOCUMENT_ROOT'];
					$fileName = $importFile->getClientOriginalName();
					$importFile->move($filePath, $fileName);
					$result = $this->importFile($filePath.'/'.$fileName);
					if($result === false){
						$errors[]['message'] = "Ошибка импорта";
					}
					else{
						unlink($filePath.'/'.$fileName);
					}
				}
				else{
					$errors[]['message'] = "Файл должен иметь расширение *.csv";
				}
			}
			else{
				$erros[]['message'] = 'Ошибка загрузки файла';
			}
			return Redirect::route('contacts.import')
			->withErrors($errors)
			->with('importResult', $result);
		}
		return View::make('contacts::import');
	}
	
	public function filter()
	{
		$contacts = Contact::whereRaw('1 = 1');
		foreach(Input::all() as $key => $value){
			if(isset(Contact::$rules[$key])){
				$value = trim($value);
				if(empty($value)){
					continue;
				}
				switch($key){
					case 'name':
						$contacts->where('name', 'LIKE', "%$value%");
					break;
					case 'phone':
						$contacts->where('phone', 'LIKE', "%$value%");
					break;
					case 'user_id':
						$contacts->where('user_id', '=', $value);
					break;
				}
			}
		}
		
		$contacts = $contacts->get();
		
		return Redirect::route('contacts.index')->withInput()->with('contacts', $contacts)->with('queryLog', DB::getQueryLog());
	}

}
