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
		$possibleTypes = $this->model->getPossibleTypes();
		if(in_array($type, $possibleTypes)){
			return $this->model->where('type', '=', $type)->get();
		}
		
		return new \Illuminate\Support\Collection();
	}
}
?>