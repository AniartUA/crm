<?php
namespace App\Controllers\Api\V1;


use App\Models\AppResponse;

class AuthController extends ApiController
{
    public function auth()
    {
        $auth = false;
        if($auth){
            return \Redirect::back();
        }
        else{
            $data = array(
                'loader' => true,
                'errors' => array(array(
                    'code' => '',
                    'message' => 'Invalid user pass',
                    'additional' => array('attribute' => 'password')
                ))
            );
            return AppResponse::error($data, 'Ошибка авторизации', 401);
        }
    }
}
