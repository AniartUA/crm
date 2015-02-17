<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 15.01.15
 * Time: 15:43
 */

namespace App\Models;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class FileRepository
 * @package App\Models
 * @method File newInstance()
 */
class FileRepository extends BaseRepository
{
    public function __construct(File $file)
    {
        $this->model = $file;
        $this->errors = new ErrorBag();
    }
}