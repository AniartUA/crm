<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 29.10.14
 * Time: 17:47
 */

namespace App\Services;


use App\Interfaces\Errorable;
use App\Traits\Errors;
use Illuminate\Support\Collection;

abstract class BaseService implements Errorable
{
    use Errors;

    protected $modelRepository;

    public function __construct(BaseRepository $modelRepository)
    {
        $this->modelRepository = $modelRepository;
        $this->errors = new ErrorBag();
    }

    public function getRepository()
    {
        return $this->modelRepository;
    }
}