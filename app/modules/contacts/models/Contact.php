<?php namespace App\Modules\Contacts\Models;

class Contact extends \Eloquent
{
	protected $guarded	= array('id');
	
	protected static $rules	= array(
		'name'				=> array('required', 'alpha', 'between:3,128'),
		'responsible_id'	=> array('numeric', 'exists: users, id'),
		'position'			=> array('alpha', 'between: 3, 128'),
	);
	
	public static function getRules()
	{
		return self::$rules;
	}
}
