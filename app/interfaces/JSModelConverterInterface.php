<?php namespace App\Interfaces;
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 27.10.14
 * Time: 17:53
 */

interface JSModelConvertInterface
{
    public function __construct(array $jsModelData = array());
    public function getAttributes();
}