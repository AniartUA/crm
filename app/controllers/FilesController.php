<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 15.01.15
 * Time: 16:15
 */

namespace App\Controllers;

use App\Models\AppResponse;
use App\Services\FilesService;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FilesController extends \BaseController
{
    protected $fileService;

    public function __construct(FilesService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function store()
    {
        $result = array('files' => array(), 'errors' => array());
        $allFiles = \Input::file();
        foreach($allFiles as $fieldName => $inputFiles){
            if(!is_array($inputFiles)){
                $inputFiles = array($inputFiles);
            }
            /**
             * @var UploadedFile $inputFile
             */
            foreach($inputFiles as $inputFile){
                if($file = $this->fileService->uploadFile($inputFile)){
                    $result['files'][] = array_merge(
                        $file->toArray(),
                        array('src' => $file->getRelativePath())
                    );
                }
            }
        }
        if($this->fileService->hasErrors()){
            $this->fileService->setErrorsAdditionalAttr('attribute', 'files');
            return AppResponse::error(
                array_merge($result, $this->fileService->getErrorsAsArray()),
                'Ошибка загрузки файла'
            );
        }
        else{
            return AppResponse::success($result);
        }
    }

    public function destroy($fileId)
    {
        $fileId = (int)$fileId;
        if($fileId > 0){
            if($this->fileService->deleteFile($fileId)){
                return AppResponse::success();
            }
            else{
                return AppResponse::error(array('loader' => true), 'Ошибка удаления файла', 404);
            }
        }
        else{
            return AppResponse::error(array('loader' => true), 'Файл не найден', 404);
        }
    }
} 