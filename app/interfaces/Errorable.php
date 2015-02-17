<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 15.01.15
 * Time: 15:22
 */

namespace App\Interfaces;


interface Errorable
{
    public function errors();
    public function getAllErrors();
    public function getLastError();
    public function setErrors($data);
    public function getErrorsAsArray();
    public function getErrorsAsJson();
} 