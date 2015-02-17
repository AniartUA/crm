<?php namespace App\Models;
use App\Interfaces\JSModelConvertInterface;
use Illuminate\Database\Eloquent\Collection;

/**
 * Created by PhpStorm.
 * User: damian
 * Date: 27.10.14
 * Time: 17:26
 */
class ContactJSModelConverter extends BaseFieldsConverter
{
    protected $mapper = array(
        'responsible'   => 'responsible_id: convertIfNotEmpty',
        'phones'        => ':convertPhones',
        'emails'        => ':convertEmails',
        'messengers'    => ':convertMessengers',
        'files'         => ':convertFiles',
    );

    protected function convertFiles($fieldValue){
        $filesId = array();
        if(is_array($fieldValue)){
            foreach($fieldValue as $file){
                $fileId = (int)$file['id'];
                if($fileId > 0){
                    $filesId[] = $file['id'];
                }
            }
        }

        return $filesId;
    }

    protected function convertPhones($fieldValue, $ruleParts = array(), $reverse = false)
    {
        $phones = array();
        if(!empty($fieldValue)){
            foreach ($fieldValue as $key => $phoneModelData) {
                $phoneConverter = new PhoneJSModelConverter($phoneModelData);
                $phone = $phoneConverter->convert($reverse);
                $phones[$key] = $phone;
            }
        }
        return $phones;
    }

    public function reversePhones($fieldValue, $ruleParts = array())
    {
        return $this->convertPhones($fieldValue, $ruleParts, true);
    }

    protected function convertEmails($fieldValue, $ruleParts = array(), $reverse = false)
    {
        $emails = array();
        if(!empty($fieldValue)){
            foreach ($fieldValue as $key => $emailModelData) {
                $emailConverter = new EmailJSModelConverter($emailModelData);
                $email = $emailConverter->getConvertedFields($reverse);
                $emails[] = $email;
            }
        }
        return $emails;
    }

    public function reverseEmails($fieldValue, $ruleParts = array())
    {
        return $this->convertEmails($fieldValue, $ruleParts, true);
    }

    protected function convertMessengers($fieldValue, $ruleParts = array(), $reverse = false)
    {
        $messengers = array();
        if(!empty($fieldValue)){
            foreach ($fieldValue as $key => $messengerModelData) {
                $messengerConverter = new MessengerJSModelConverter($messengerModelData);
                $messenger = $messengerConverter->getConvertedFields($reverse);
                $messengers[] = $messenger;
            }
        }
        return $messengers;
    }

    public function reverseMessengers($fieldValue, $ruleParts)
    {
        return $this->convertMessengers($fieldValue, $ruleParts, true);
    }
}