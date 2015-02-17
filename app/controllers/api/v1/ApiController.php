<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 29.01.15
 * Time: 10:49
 */

namespace App\Controllers\Api\V1;


class ApiController extends \Controller{

    protected function getSort()
    {
        $result = array();
        $sort = \Request::get('sort');
        if($sort){
            foreach(explode('|', $sort) as $sortRule){
                $sortOrder = 'asc';
                if($sortRule[0] == '-'){
                    $sortOrder = 'desc';
                    $sortRule = substr_replace($sortRule, '', 0, 1);
                }
                $result[$sortRule] = $sortOrder;
            }
        }

        return $result;
    }

    protected function getFilter()
    {
        $result = array();
        $filter = \Request::get('filter');
        if($filter){
            foreach(explode('|', $filter) as $filterRule){
                $filterParams = explode('::', $filterRule);
                $fieldName = array_shift($filterParams);
                $result[$fieldName][] = $filterParams;
            }
        }
        return $result;
    }
} 