<?php namespace App\Controllers\Api\V1;

use App\Models\AppResponse;
use App\Services\ContactsService;

class ContactsController extends ApiController
{

    protected $contactService;
    protected $mediaTypes;

    public function __construct(ContactsService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function index()
    {
        $contacts = $this->contactService->getContactsUsingFilters($this->getSort(), $this->getFilter(), array());
        if(!$contacts){
            $contacts = $this->contactService->getRepository()->paginate();
        }
        //var_dump(\DB::getQueryLog());die;
        //var_dump($contacts->toArray());die;
        return AppResponse::success($contacts->toArray());
    }
}
?>