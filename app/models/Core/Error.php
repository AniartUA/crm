<?php namespace App\Models;

class Error
{
	protected $code = '';
	protected $message = '';
    protected $additional = array();
	
	public function __construct($message = '', $code = '', $additional = array())
	{
		$this->setMessage($message);
		$this->setCode($code);
        $this->setAdditional($additional);
	}

    public function setMessage($message = '')
    {
        if(isset($message)) {
            $this->message = $message;
        }
    }

    public function setCode($code = '')
    {
        if(isset($code)) {
            $this->code = $code;
        }
    }

    public function setAdditional($additional = array())
    {
        if (is_array($additional)) {
            $this->additional = $additional;
        }
    }

    public function getMessage(){
        return $this->message;
    }

    public function getCode(){
        return $this->code;
    }

    public function getAdditional(){
        return $this->additional;
    }

    public function toArray()
    {
        return get_object_vars($this);
    }

    public function toJson()
    {
        return json_encode($this->toArray());
    }
}
?>