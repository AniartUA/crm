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
			$mediaTypes = $this->mediaTypes->all();
		}
		else{
			$mediaTypes = $this->mediaTypes->getAllByType($type);
		}
		
		return json_encode($mediaTypes->toArray());
	}
	
	public function store()
	{
        $mediaType = $this->mediaTypes->create(\Input::only(array('name', 'type')));
        if($mediaType->exists){
            $result = array('status' => 'ok', 'id' => $mediaType->id);
        }
        else{
            $result = array('status' => 'error', 'error' => $mediaType->getErrors()->last());
        }

        return json_encode($result);
    }
	
	public function create()
	{
	}
	
	public function update($id)
	{
        $updated = $this->mediaTypes->update($id, \Input::only(array('name', 'type')));
		if($updated){
			$result = array('status' => 'ok');
		}
		else{
            $mediaType = $this->mediaTypes->getModel();
			$result = array('status' => 'error', 'error' => $mediaType->getErrors()->last());
		}
		
		return json_encode($result);
	}
	
	public function destroy($id)
	{
		if($this->mediaTypes->destroy($id)){
			$result = array('status' => 'ok');
		}
		else{
			$result = array('status' => 'error', 'message' => 'error');
		}
		
		return json_encode($result);
	}
}
?>