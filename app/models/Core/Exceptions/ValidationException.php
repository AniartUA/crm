<?php namespace App\Exceptions;
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 28.10.14
 * Time: 18:46
 */

class ValidationException extends \Exception
{
    protected $errors;

    public function __construct(\Illuminate\Support\Collection $errors, $message = null, $code = 0, \Exception $previous = null)
    {
        if(!$code){
            $code = 422;
        }
        $this->errors = $errors;
        parent::__construct($message, $code, $previous);
    }

    public function getErrors()
    {
        return $this->errors;
    }
}
