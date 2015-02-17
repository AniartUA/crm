<?php namespace App\Models;

class MediaTypeRepository extends BaseRepository
{
	public function __construct(MediaType $model)
	{
		$this->model = $model;
	}
	/**
	 * Возвращает медиа-типы отпределенного типа
	 * 
	 * @param string $type
	 * 
	 * @return array
	 */
	public function getAllByType($type)
	{
		$mediaTypes = $this->all()->filter(function($mediaType) use ($type){
			return $mediaType->type == $type;
		});
		
		if($mediaTypes->isEmpty()){
			return new \Illuminate\Support\Collection();
		}
		else{//reset keys
			$mediaTypes->values();
		}
		
		
		return $mediaTypes;
	}
}
?>