<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 15.01.15
 * Time: 15:04
 */

namespace App\Models;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class File
 * @package App\Models
 * @property string $subdir
 * @property string $name
 * @property string $original_name
 * @property int $size
 * @property string $content_type
 * @property \Symfony\Component\HttpFoundation\File\File $file
 */
class File extends BaseModel
{
    protected $guarded = array('id');
    protected $fillable = array('file', 'size', 'content_type', 'subdir', 'name', 'original_name', 'description',  'contact_id');
    protected $appends = array('file');
    protected $hidden = array('file');

    const UPLOAD_FOLDER = 'upload';

    protected $rules = array(
        'default' => array(
            'size' => array('min:1'),
            'name' => array('required'),
            'original_name' => array('required'),
        )
    );

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contact()
    {
        return $this->belongsTo('\App\Models\Contact');
    }

    public function setFileAttribute(\Symfony\Component\HttpFoundation\File\File $file)
    {
        $this->attributes['file'] = $file;
        $this->original_name = ($file instanceof UploadedFile) ? $file->getClientOriginalName() : $file->getFilename();
        $this->size = $file->getSize();
        $this->content_type = $file->getMimeType();
    }

    public function getFileAttribute()
    {
        return $this->attributes['file'];
    }

    public function setSubdirAttribute($subdir)
    {
        if(!empty($subdir)) {
            $this->attributes['subdir'] = trim($subdir, '/');
        }
    }

    public function setOriginalNameAttribute($name)
    {
        $ext = pathinfo($name, PATHINFO_EXTENSION);
        if(!empty($ext)){
            $ext = '.'.$ext;
        }
        $this->attributes['original_name'] = $name;
        $this->name = md5(time().$this->original_name).$ext;
        if(empty($this->subdir)){
            $this->subdir = mb_substr($this->name, 0, 3);
        }
    }

    public function getRelativeFolderPath()
    {
        return self::UPLOAD_FOLDER.'/'.$this->subdir;
    }

    public function getFullFolderPath()
    {
        return $_SERVER['DOCUMENT_ROOT'].'/'.$this->getRelativeFolderPath();
    }

    public function getRelativePath()
    {
        return $this->getRelativeFolderPath().'/'.$this->name;
    }

    public function getFullPath()
    {
        return $this->getFullFolderPath().'/'.$this->name;
    }

    public function toArray()
    {
        $array = parent::toArray();
        $array['src'] =  $this->getRelativePath();

        return $array;
    }

    public static function normalizeFilePath($filePath)
    {
        $filePath = ltrim($filePath, '/');
        $filePath = $_SERVER['DOCUMENT_ROOT'].'/'.str_replace($_SERVER['DOCUMENT_ROOT'], '', $filePath);
        return $filePath;
    }
}