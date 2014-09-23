<?php namespace App\Controllers\Settings;

use App\Models\MediaType;
use App\Models\MediaTypeRepository;
class MediaTypesController extends \BaseController
{
	/**
	 * 
	 * @var \App\Models\MediaTypeRepository
	 */
	protected $mediaTypes;
	
	public function __construct(MediaTypeRepository $mediaTypes)
	{
		$this->mediaTypes = $mediaTypes;
	}
	
	public function index()
	{
		$type = \Input::get('type');
		if(empty($type)){
			$mediaTypes = $this->mediaTypes->getAll();
		}
		else{
			$mediaTypes = $this->mediaTypes->getAllByType($type);
		}
		
		return json_encode($mediaTypes->toArray());
	}
	
	public function store()
	{
		return $this->create();
	}
	
	public function create()
	{
		$mediaType = $this->mediaTypes->getNew(\Input::only(array('name', 'type')));
		if($mediaType->save()){
			$result = array('status' => 'ok', 'id' => $mediaType->id);
		}
		else{
			$result = array('status' => 'error', 'error' => $mediaType->getErrors()->last());
		}
		
		return json_encode($result);
	}
	
	public function update($id)
	{
		$mediaType = $this->mediaTypes->getById($id);
		$mediaType->name = \Input::get('name');
		$mediaType->type = \Input::get('type');
		
		if($mediaType->save()){
			$result = array('status' => 'ok');
		}
		else{
			$result = array('status' => 'error', 'error' => $mediaType->getErrors()->last());
		}
		
		return json_encode($result);
	}
	
	public function destroy($id)
	{
		$mediaType = $this->mediaTypes->getById($id);
		if($mediaType->delete()){
			$result = array('status' => 'ok');
		}
		else{
			$result = array('status' => 'error', 'message' => 'error');
		}
		
		return json_encode($result);
	}
}
?>