<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 02.02.15
 * Time: 9:48
 */

namespace App\Models;


class AppResponse
{
    public static function send($data = array(), $message = '', $status = 'success', $code = 200 )
    {
        $data = array(
            'code' => $code,
            'status' => $status,
            'message' => $message,
            'data' => (array)$data
        );
        return \Response::json($data, $code);
    }

    public static function error($data = array(), $message = 'Application Error', $code = 400)
    {
        return self::send($data, $message, 'error', $code);
    }

    public static function success($data = array(), $message = 'OK', $code = 200)
    {
        return self::send($data, $message, 'success', $code);
    }

    public static function fail($data = array(), $message = 'Server Error', $code = 500)
    {
        return self::send($data, $message, 'fail', $code);
    }
}