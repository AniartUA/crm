<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 29.10.14
 * Time: 17:23
 */

namespace App\Services;


use App\Models\Contact;
use App\Models\ContactRepository;
use App\Models\EmailRepository;
use App\Models\ErrorBag;
use App\Models\File;
use App\Models\FileRepository;
use App\Models\MessengerRepository;
use App\Models\PhoneRepository;

class ContactsService extends BaseService
{
    /**
     * @var ErrorBag;
     */
    protected $contacts;
    protected $phones;
    protected $emails;
    protected $messengers;

    public function __construct(
        ContactRepository $contactRepository, PhoneRepository $phoneRepository, EmailRepository $emailRepository,
        MessengerRepository $messengerRepository, FileRepository $fileRepository
    )
    {
        $this->contacts = $this->modelRepository = $contactRepository;
        $this->phones = $phoneRepository;
        $this->emails = $emailRepository;
        $this->messengers = $messengerRepository;
        $this->files = $fileRepository;
        $this->errors = new ErrorBag();
    }

    /**
     * Обновляет ранее созданный контакт и связанные с ним сущности
     * @param $id
     * @param array $attributes
     * @return Contact|bool
     */
    public function updateContact($id, array $attributes = array())
    {
        /**
         * @var Contact $contact
         */
        $contact = $this->contacts->find($id);
        if ($contact) {
            $contact->fill($attributes);
            if ($this->saveContact($contact, $attributes)) {
                return $contact;
            }
        } else {
            $this->setErrors('Contact not found');
        }

        return false;
    }

    /**
     * Сохраняет контакт и связанные с ним сущности
     * @param Contact $contact
     * @param array $relatives
     * @return Contact|bool
     */
    public function saveContact(Contact $contact, array $relatives = array())
    {
        //Если ошибок нет - сохраняем контакт и зависимые сущности
        if ($this->checkContact($contact, $relatives)) {
            if ($this->contacts->save($contact)) {
                $this->syncEmails($contact, $relatives['emails']);
                $this->syncPhones($contact, $relatives['phones']);
                $this->syncMessengers($contact, $relatives['messengers']);
                $this->attachFilesToContact($contact, $relatives['files']);

                return true;
            }
        }

        return false;
    }

    /**
     * Валидирует контакт и связанные с ним сущности, ошибки можно получить через $this->getAllErrors()
     * @param Contact $contact
     * @param array $relatives
     * @return bool
     */
    public function checkContact(Contact $contact, array $relatives = array())
    {
        //В первую очередь сделаем валидацию контактов
        if (!$contact->isValid()) {
            $this->setErrors($contact);
        }
        //Валидируем все связанные сущности
        if (is_array($relatives['phones'])) {
            $this->setPhoneValidateErrors($relatives['phones']);
        }
        if (is_array($relatives['emails'])) {
            $this->setEmailValidateErrors($relatives['emails']);
        }
        if (is_array($relatives['messengers'])) {
            $this->setMessengerValidateErrors($relatives['messengers']);
        }

        return !$this->hasErrors();
    }

    /**
     * @param array $phones
     * @throws \Exception
     */
    protected function setPhoneValidateErrors(array $phones)
    {
        foreach ($phones as $index => $phone) {
            $phone = $this->phones->newInstance($phone);
            if ($phone->phone && !$phone->isValid(array('id' => (int)$phone->id, 'formPosition' => $index))) {
                $phone->setErrorsAdditionalAttr('attribute', 'phone');
                $this->setErrors($phone);
            }
        }
    }

    protected function setEmailValidateErrors(array $emails)
    {
        foreach ($emails as $index => $email) {
            $email = $this->emails->newInstance($email);
            if ($email->email && !$email->isValid(array('id' => (int)$email->id, 'formPosition' => $index))) {
                $email->setErrorsAdditionalAttr('attribute', 'email');
                $this->setErrors($email);
            }
        }
    }

    protected function setMessengerValidateErrors(array $messengers)
    {
        foreach ($messengers as $index => $messenger) {
            $messenger = $this->messengers->newInstance($messenger);
            if ($messenger->value && !$messenger->isValid(array('id' => (int)$messenger->id, 'formPosition' => $index))) {
                $messenger->setErrorsAdditionalAttr('attribute', 'messenger');
                $this->setErrors($messenger);
            }
        }
    }

    public function syncEmails(Contact $contact, array $emails = null)
    {
        if (isset($emails)) {
            $contact->emails()->delete();
            foreach ($emails as $email) {
                if (!empty($email['email'])) {
                    $email = $this->emails->newInstance($email);
                    $contact->emails()->save($email);
                }
            }
        }
    }

    /**
     * @param Contact $contact
     * @param array $phones
     */
    public function syncPhones(Contact $contact, array $phones = null)
    {
        if (isset($phones)) {
            //удаляем все старое
            $contact->phones()->delete();
            foreach ($phones as $phone) {
                //записываем новое
                if (!empty($phone['phone'])) {
                    $phone = $this->phones->newInstance($phone);
                    $contact->phones()->save($phone);
                }
            }
        }
    }

    public function syncMessengers(Contact $contact, array $messengers = null)
    {
        if (isset($messengers)) {
            $contact->messengers()->delete();
            foreach ($messengers as $messenger) {
                if (!empty($messenger['value'])) {
                    $messenger = $this->messengers->newInstance($messenger);
                    $contact->messengers()->save($messenger);
                }
            }
        }
    }

    /**
     * Прикрепляет к контакту файлы
     * @param Contact $contact - контакт
     * @param array $files - массив идентификаторов файлов
     */
    public function attachFilesToContact(Contact $contact, array $files = null)
    {
        if (isset($files)) {
            foreach ($files as $fileId) {
                if ($fileId > 0) {
                    /**
                     * @var File $fileModel
                     */
                    $fileModel = $this->files->find($fileId);
                    $fileModel->contact()->associate($contact);
                    $this->files->save($fileModel);
                }
            }
        }
    }

    /**
     * Создает новый контакт с атрибутами описаными в $attributes
     * @param array $attributes может содержать также данные связанных сущностей
     * @return Contact|bool
     */
    public function createContact(array $attributes = array())
    {
        /**
         * @var Contact $contact
         */
        $contact = $this->contacts->newInstance($attributes);
        if ($this->saveContact($contact, $attributes)) {
            return $contact;
        }

        return false;
    }

    /**
     * @param array $sort
     * @param array $filter
     * @param bool $paginate
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Pagination\Paginator|static[]
     *
     * TODO спроектировать и вынести всю обработку в отдельный класс
     */
    public function getContactsUsingFilters($sort = array(), $filter = array(), $paginate = false)
    {
        if (!empty($sort)) {
            foreach ($sort as $sortField => $sortOrder) {
                $funcName = 'orderBy' . $sortField;
                if (method_exists($this->contacts, $funcName)) {
                    $this->contacts->$funcName($sortOrder);
                } else if(in_array($sortField, $this->contacts->getModel()->getFillable())){ //TODO Тут надо что-то другое придумать, а то поле там может и не быть
                    $this->contacts->orderByField($sortField, $sortOrder);
                }
            }
        }
        if ($paginate === false) {
            return $this->contacts->get();
        } else {
            if (empty($paginate)) {
                $paginate = null;
            }
            return $this->contacts->paginate($paginate);
        }
    }
}