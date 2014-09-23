<?php namespace App\Models;

class PhoneEloquent extends \Eloquent
{
	protected $table	= 'phones';
	public $timestamps	= false;
}

class Phone
{
	public static function getTypes()
	{
		$mediaType = new MediaType();
		
		return $mediaType->getAllByType('phone');
	}
}

?>