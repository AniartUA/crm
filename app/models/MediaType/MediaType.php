<?php namespace App\Models;

class MediaType extends BaseModel
{
	public $timestamps 	= false;
	protected $rules	= array(
		'id'	=> array('integer', 'min:0'),
		'name'	=> array('required', 'unique:media_types,name', 'alpha_spaces', 'between:2,128'),
		'type'	=> array('required', 'alpha')
	);
	protected $fillable = array('name', 'type');
	
	/**
	 * Возвращает возможные типы (работает только для postgre)
	 * 
	 * @return array
	 */
	public static function getPossibleTypes()
	{
		$types = \Cache::get('MediaType::possibleTypes', array());
		if(empty($types)){
			$stdTypes = \DB::select('SELECT unnest(enum_range(NULL::mediatypes))');
			foreach($stdTypes as $type){
				$types[] = $type->unnest;
			}
			\Cache::forever('MediaType::possibleTypes', $types);	
		}
		
		return $types;
	}
}
?>