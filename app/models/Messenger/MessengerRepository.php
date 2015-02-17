<?php namespace App\Models;
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 24.10.14
 * Time: 16:31
 */

class MessengerRepository extends BaseRepository
{
    public function __construct(Messenger $messenger)
    {
        $this->model = $messenger;
    }
}