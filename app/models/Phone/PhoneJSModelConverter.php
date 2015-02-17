<?php namespace App\Models;
use App\Interfaces\JSModelConvertInterface;

/**
 * Created by PhpStorm.
 * User: damian
 * Date: 27.10.14
 * Time: 17:57
 */
class PhoneJSModelConverter extends BaseFieldsConverter
{
    protected $mapper = array(
        'mediaTypeId' => 'media_type_id',
        'contactId' => 'contact_id',
        'value' => 'phone:convertPhoneValue'
    );

    public function convertPhoneValue($phone){
        if(!empty($phone)) {
            return preg_replace('/[^0-9]/', '', $phone);
        }
    }
}

