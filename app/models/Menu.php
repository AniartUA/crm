<?php namespace App;

use Request;

class Menu
{
	protected $id		= 0;
	protected $items	= array();
	
	public function __construct($id, $items  = array())
	{
		$this->id = $id;
		if(is_array($items)){
			$this->items = $items;
		}
	}	
	
	public function getId()
	{
		return $this->id;
	}
	
	public function getItems()
	{
		return $this->items;
	}
	
	public function getItem($id)
	{
		foreach($this->items as $item){
			if($item['id'] == $id){
				return $item;
			}
		}
		
		return false;
	}
	
	public function addItem($itemData, $position = false)
	{
		$item = $itemData;
		
		if($position === false || (int)$position < 0){
			$position = count($this->items);
		}
		$this->items = array_splice($this->items, $position, 0, $item);
		
		return $this;
	}
	
	public function removeItem($id)
	{
		foreach($this->items as $index => $item){
			if($item['id'] == $id){
				$this->items = array_splice($this->items, $index, 1);
				break;
			}
		}
		
		return $this;
	}
	
	public function isItemActive($id)
	{
		if($item = $this->getItem($id)){
			$url = $item['url'];
			return (Request::is($url.'/*') || Request::is($url));
		}
		
		return false;
	}
	
	public function getActiveItem()
	{
		foreach($this->items as $item){
			if($this->isItemActive($item['id'])){
				return $item;
			}
		}
		
		return false;
	}
	
}

?>