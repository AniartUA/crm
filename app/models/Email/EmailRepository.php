<?php namespace App\Models;
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 24.10.14
 * Time: 16:31
 */

class EmailRepository extends BaseRepository
{
    public function __construct(Email $email)
    {
        $this->model = $email;
    }
}