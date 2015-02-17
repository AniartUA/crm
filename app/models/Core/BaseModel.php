<?php namespace App\Models;

use App\Exceptions\ValidationException;
use App\Interfaces\Errorable;
use App\Traits\Errors;

abstract class BaseModel extends \Eloquent implements Errorable
{
    use Errors;

	protected $rules = array();
	protected $messages = array();
	/**
	 * 
	 * @var \Illuminate\Validation\Validator
	 */
	protected $validator = null;

    public function __construct(array $attributes = array())
    {
        parent::__construct($attributes);
        $this->errors = new ErrorBag();
    }

    public function save(array $attributes = array())
    {
        $this->validateOrFail();
        return parent::save($attributes);
    }

    public function isFieldRequired($fieldName)
    {
        $currentRules = $this->prepareRules();
        if(isset($currentRules[$fieldName])){
            foreach($currentRules[$fieldName] as $rule){
                if(mb_strpos($rule, 'required')){
                    return false;
                }
            }
        }

        return false;
    }

	public function isValid($additional = array())
	{
        try{
            $this->validateOrFail($additional);
        }
        catch(ValidationException $e){
            return false;
        }

        return true;
	}

    public function validateOrFail($additional = array())
    {
        $attributes = $this->getAttributes();
        $this->validator = \Validator::make($attributes, $this->prepareRules());
        if($this->validator->fails()){
            $messages = $this->validator->messages();
            foreach($attributes as $key => $value){
                if($messages->has($key)){
                    foreach($messages->get($key) as $message){
                        $additional['attribute'] = $key;
                        $this->errors->add(new Error($message, '', $additional));
                    }
                }
            }
            throw new ValidationException($this->errors->errors());
        }

        return true;
    }

    private function prepareRules()
    {
        $currentRules = is_array($this->rules) ? $this->rules : array();
        foreach(array('default', 'create', 'update') as $action){
            if(!isset($currentRules[$action])){
                $currentRules[$action] = array();
            }
        }
        $mergedRules = array();
        if($this->exists){
            $mergedRules = array_merge_recursive($currentRules['default'], $currentRules['update']);
        }
        else{
            $mergedRules = array_merge_recursive($currentRules['default'], $currentRules['create']);
        }

        return $mergedRules;
    }
	
	public function getValidator()
	{
		return $this->validator;
	}

	public function getRules($action = '', $field = '')
	{
        if(!$action){
            return $this->rules;
        }
        else{
            if(!$field){
                return $this->rules[$action];
            }
            else{
                return $this->rules[$action][$field];
            }
        }
	}

    public function setRules($rules, $action = '')
    {
        if(!$action){
            $this->rules = $rules;
        }
        else{
            $this->rules[$action] = $rules;
        }
    }

	public function getMessages()
	{
		return $this->messages;
	}
}
?>