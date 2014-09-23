<?php namespace App\Models;

abstract class BaseModel extends \Eloquent
{
	protected $rules = array();
	protected $messages = array();
	protected $errors = null;
	/**
	 * 
	 * @var \Illuminate\Validation\Validator
	 */
	protected $validator = null;
	
	public function isValid()
	{
		$attributes = $this->getAttributes(); 
		$this->validator = \Validator::make($attributes, $this->getRules());
		if($this->validator->fails()){
			$messages = $this->validator->messages();
			foreach($attributes as $key => $value){
				if($messages->has($key)){
					foreach($messages->get($key) as $message){
						$this->setError($message, $key);
					}
				}
			}
				
			return false;
		}
	
		return true;
	}
	
	public function getValidator()
	{
		return $this->validator;
	}
	
	public function save(array $options = array())
	{
		if(!$this->isValid()){
			return false;
		}
	
		return parent::save($options);
	}
	
	
	public function setError($message, $code = '')
	{
		if(!$this->errors){
			$this->errors = new \Illuminate\Support\Collection();
		}
		$this->errors->push(new Error($message, $code));
	}

	/**
	 * 
	 * @return \Illuminate\Support\Collection
	 */
	public function getErrors()
	{
		return $this->errors;
	}
	
	public function getRules($field = null)
	{
		if(!$field){
			return $this->rules;
		}
		else{
			return $this->rules[$field];
		}
	}
	
	public function getMessages()
	{
		return $this->messages;
	}
}
?>