<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 15.01.15
 * Time: 16:48
 */

namespace App\Services;
use App\Models\File;
use App\Models\ErrorBag;
use App\Models\FileRepository;
use Symfony\Component\HttpFoundation\File\File as SymphonyFile;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class FileService
 * @package App\Models
 * @method FileRepository getRepository()
 */
class FilesService extends BaseService
{
    protected $modelRepository;

    public function __construct(FileRepository $files)
    {
        $this->modelRepository = $files;
        $this->errors = new ErrorBag();
    }

    /**
     * Создает экземпляр класса App\Models\File используя Symfony\Component\HttpFoundation\File\File
     * @param \Symfony\Component\HttpFoundation\File\File $uploadedFile
     * @return \App\Models\File
     */
    public function createFileFromUploadedFile(SymphonyFile $uploadedFile)
    {
        $file = $this->getRepository()->newInstance(array(
            'file' => $uploadedFile
        ));

        return $file;
    }

    /**
     * Создает экземпляр класса App\Models\File из суперглобального массива $_FILES
     * @param array $_FILE
     * @return \App\Models\File|bool
     */
    public function createFileFromArray(array $_FILE)
    {
        $file = false;
        if(isset($_FILE['error']) && $_FILE['error'] > 0){
            //TODO fill errors messages
            $this->setErrors(array('code' => $_FILE['error'], 'message' => 'File uploading error: '.$_FILE['code']));
        }
        else{
            try {
                $uploadedFile = new UploadedFile(
                    $_FILE['tmp_name'],
                    $_FILE['name'],
                    $_FILE['type'],
                    $_FILE['size'],
                    $_FILE['error']
                );
                $file = $this->createFileFromUploadedFile($uploadedFile);
            }
            catch(\Exception $e){
                $this->setErrors(array('message' => $e->getMessage()));
            }
        }

        return $file;
    }

    /**
     * Создает экземпляр класса App\Models\File заданный путём $filePath
     * @param $filePath - относительный (от проекта), либо абсолютный путь к файлу
     * @return bool|\App\Models\File
     */
    public function createFileByPath($filePath)
    {
        $file = false;
        $filePath = File::normalizeFilePath($filePath);
        if(\File::exists($filePath)){
            $file = $this->createFileFromUploadedFile(new SymphonyFile($filePath, false));
        }
        else{
            $this->setErrors(array('message' => 'File not found'));
        }

        return $file;
    }

    /**
     * Загружает файл на диск и регистрирует его в БД
     * @param mixed $inputFile - путь к файлу, либо массив описывающий файл из $_FILES, либо экземпляр класса
     * Symfony\Component\HttpFoundation\File\File
     * @param string $uploadFolder - имя папка относительно /upload
     * @param bool $useOriginalName - если true, то в качестве имени будет использоваться оригиналное название файла,
     * в противном случае будет создан случайный хеш
     * @throws \ErrorException
     * @return bool|File
     */
    public function uploadFile($inputFile, $uploadFolder = "", $useOriginalName = false)
    {
        $file = false;
        if(is_array($inputFile)){
            $file = $this->createFileFromArray($inputFile);
        }
        elseif(is_string($inputFile)){
            $file = $this->createFileByPath($inputFile);
        }
        elseif($inputFile instanceof SymphonyFile){
            $file = $this->createFileFromUploadedFile($inputFile);
        }

        if($file) {
            if (!empty($uploadFolder)) {
                $file->subdir = $uploadFolder;
            }
            if ($useOriginalName) {
                $file->name = $file->original_name;
            }
            //создаем директорию
            $folderExists = \File::exists($file->getFullFolderPath());
            if(!$folderExists){
                $folderExists = \File::makeDirectory($file->getFullFolderPath(), 0755, true);
            }
            if ($folderExists) {
                //загружаем файл
                //TODO вынести в отдельную функцию и сделать проверку на наличие файла с таким именем чтобы избежать коллизий
                if (\File::copy($file->file->getRealPath(), $file->getFullPath())) {
                    //сохраняем файл в БД
                    if ($file->isValid()) {
                        try {
                            $file = $this->getRepository()->create($file->toArray());
                        } catch (\ErrorException $e) {
                            $file->setErrors(array('message' => $e->getMessage()));
                        }
                    } else {
                        $file->setErrors($file);
                    }
                } else {
                    $file->setErrors(array('message' => 'Cannot copy files from
                        "' . $file->file->getRealPath() . '" to
                        "' . $file->getFullPath() . '"
                    '));
                }
            } else {
                $file->setErrors(array('message' => 'Cannot create folder "' . $file->getFullFolderPath() . '"'));
            }
        }
        else{
            throw new \ErrorException('Invalid file type');
        }
        if($file->hasErrors()){
            $error = $file->getLastError();
            $error->setAdditional(array('fileName' => $file->original_name, 'fileSize' => $file->size));
            $this->setErrors($error);
            $file = false;
        }

        return $file;
    }

    /**
     * @param \App\Models\File|int $file
     * @return bool
     */
    public function deleteFile($file)
    {
        $count = 0;
        if($file instanceof File){
            $file = $file->id;
        }
        $file = (int)$file;
        if($file > 0){
            $count = $this->getRepository()->destroy($file);
        }

        return $count > 0;
    }
}