<?php namespace App\Models;

class Error
{
	public $code = '';
	public $message = '';
	
	public function __construct($message, $code = '')
	{
		$this->code = $code;
		$this->message = $message;
	}
}
?>