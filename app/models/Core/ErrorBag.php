<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 29.10.14
 * Time: 18:47
 */

namespace App\Models;


use Illuminate\Support\Collection;

class ErrorBag {
    /**
     * @var Collection;
     */
    protected $errors;

    public function __construct()
    {
        $this->errors = Collection::make(array());
    }

    /**
     * @param Collection|Error|BaseModel $data
     * @throws \Exception
     */
    public function add($data)
    {
        if($data instanceof Collection) {
            $this->errors = $this->errors->merge($data);
        }
        elseif($data instanceof Error){
            $this->errors->push($data);
        }
        elseif(is_array($data)){
            $this->add(new Error($data['message'], $data['code'], $data['additional']));
        }
        elseif($data instanceof BaseModel){
            /**
             * @var BaseModel $data
             */
            $this->add($data->errors());
        }
        else{
            throw new \Exception('Invalid type for $data.');
        }
    }

    public function errors()
    {
        return $this->errors;
    }

    /**
     * @param \Illuminate\Support\Collection|\Illuminate\Support\Contracts\ArrayableInterface|array  $errors
     */
    public function merge($errors)
    {
        $this->errors->merge($errors);
    }

    /**
     * @return Error[]
     */
    public function all()
    {
        return $this->errors->all();
    }

    /**
     * @return Error|null
     */
    public function last()
    {
        return $this->errors->last();
    }

    public function isEmpty()
    {
        return $this->errors->isEmpty();
    }

    /**
     * @param bool $formatted создавать массив с ключем errors
     * @return array
     */
    public function toArray($formatted = true)
    {
        $errors = array();
        if(!$this->isEmpty()){
            foreach($this->errors as $error){
               $errors[] = $error->toArray();
            }
        }
        if($formatted){
            $errors = array('errors' => $errors);
        }

        return $errors;
    }

    public function toJson()
    {
        return json_encode($this->toArray());
    }
}