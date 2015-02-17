<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 15.01.15
 * Time: 15:05
 */

namespace App\Traits;


trait Errors
{
    /**
     * @var \App\Models\ErrorBag
     */
    protected $errors;

    public function errors()
    {
        return $this->errors->errors();
    }

    public function hasErrors()
    {
        return !$this->errors->isEmpty();
    }

    /**
     * @return \App\Models\Error[]
     */
    public function getAllErrors()
    {
        return $this->errors->all();
    }


    /**
     * @return \App\Models\Error|null
     */
    public function getLastError()
    {
        return $this->errors->last();
    }

    /**
     * @param \App\Models\ErrorBag|\App\Models\Error|\App\Models\BaseModel
     * @throws \Exception
     * @return false
     */
    public function setErrors($data)
    {
        $this->errors->add($data);
        return false;
    }

    public function setErrorsCode($code = "")
    {
        array_map(function($error) use ($code){
            /**
             * @var \App\Models\Error $error
             */
            $error->setCode($code);
        }, $this->getAllErrors());
    }

    public function setErrorsMessage($message = "")
    {
        $this->errors()->map(function($error) use ($message){
            /**
             * @var \App\Models\Error $error
             */
            $error->setMessage($message);
        });
    }

    public function setErrorsAdditional(array $additional)
    {
        $this->errors()->map(function($error) use ($additional){
           $error->setAdditional($additional);
        });
    }

    public function setErrorsAdditionalAttr($attrName, $attrValue)
    {
        $this->errors()->map(function($error) use ($attrName, $attrValue){
            $additional = $error->getAdditional();
            $additional[$attrName] = $attrValue;
            $error->setAdditional($additional);
        });
    }

    public function getErrorsAsArray($formatted = true)
    {
        return $this->errors->toArray($formatted);
    }

    public function getErrorsAsJson()
    {
        return $this->errors->toJson();
    }

} 