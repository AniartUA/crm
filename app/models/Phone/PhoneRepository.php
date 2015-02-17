<?php namespace App\Models;
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 24.10.14
 * Time: 16:31
 */

/**
 * Class PhoneRepository
 * @package App\Models
 */
class PhoneRepository extends BaseRepository
{
    public function __construct(Phone $phone)
    {
        $this->model = $phone;
    }
}