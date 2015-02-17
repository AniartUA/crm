<?php namespace App\Controllers;

/**
 * Created by PhpStorm.
 * User: damian
 * Date: 14.11.14
 * Time: 8:53
 */

use Breadcrumbs, View, URL;

class TestsController extends \BaseController
{
    public function index(){
        $this->initBreadcrumbs();
        return \View::make('main.tests.index');
    }

    protected function initBreadcrumbs()
    {
        Breadcrumbs::register('tests.index', function($breadcrumbs){
            $breadcrumbs->parent('index'); //composers.php
            $breadcrumbs->push('Тесты', URL::route('tests.index'));
        });
    }
} 