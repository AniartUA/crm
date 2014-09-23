<?php namespace App\Controllers\Settings;

class SettingsController extends \BaseController
{
	public function index()
	{
		$this->initBreadcrumbs();
		return \View::make('main.settings.index');
	}
	
	public function initBreadcrumbs()
	{
		\Breadcrumbs::register('settings.index', function($breadcrumbs){
			$breadcrumbs->parent('index');
			$breadcrumbs->push(\Lang::get('views/main.settings'), \URL::route('settings.index'));
		});
		
	}
}
?>