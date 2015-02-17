<?php namespace App\Models;
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 24.10.14
 * Time: 15:59
 */


class Messenger extends BaseModel
{
    public $timestamps = false;
    protected $guarded = array('id');

    protected $rules = array(
        'default' => array(
            'value'   => array('required'),
            'media_type_id' => array('required', 'numeric', 'exists:media_types,id'),
            'contact_id' => array('numeric', 'exists:contacts,id')
        )
    );

    public function contact()
    {
        return $this->belongsTo('\App\Models\Contact');
    }
}
