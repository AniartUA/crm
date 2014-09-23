<?php namespace App\Models;

abstract class BaseRepository
{
	/**
	 * 
	 * @var BaseModel
	 */
	protected $model = null;
	
	public function __construct($model = null)
	{
		$this->setModel($model);
	}
	
	public function setModel($model)
	{
		$this->model = $model;
	}

	/**
	 * 
	 * @return \App\Models\BaseModel
	 */
	public function getModel()
	{
		return $this->model;
	}
	
	public function getNew($attributes = array())
	{
		return $this->model->newInstance($attributes);
	}
	
	/**
	 * 
	 * @return \Illuminate\Database\Eloquent\Collection $result
	 */
	public function getAll()
	{
		return $this->model->all();
	}
	
	public function getAllPaginated($count)
	{
		return $this->model->paginate($count);
	}
	
	public function getById($id)
	{
		return $this->model->find($id);
	}
}
?>