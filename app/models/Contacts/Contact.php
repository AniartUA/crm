<?php namespace App\Models;

class Contact extends BaseModel
{
	protected $guarded	= array('id');
    protected $fillable = array('name', 'user_id', 'responsible_id', 'comment_id', 'position');
    protected $with = array('phones', 'emails', 'messengers', 'files');

	protected $rules = array(
        'default' => array(
            'name'				=> array('required', 'between:3,128'),
            'responsible_id'	=> array('numeric', 'min: 1'/*, 'exists: users, id'*/),
            'position'			=> array('alpha', 'between: 3, 128')
        )
	);

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function files()
    {
        return $this->hasMany('\App\Models\File');
    }

    public function phones()
    {
        return $this->hasMany('\App\Models\Phone');
    }

    public function emails()
    {
        return $this->hasMany('\App\Models\Email');
    }

    public function messengers()
    {
        return $this->hasMany('\App\Models\Messenger');
    }
}
