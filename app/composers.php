<?php 

View::composer('main.panel', function($view){
	//process breadcrumb
	Breadcrumbs::register('index', function($breadcrumbs){
		$breadcrumbs->push(Lang::get('views/main.dashboard'), URL::route('index'));
	});
	$breadcrumbs = Breadcrumbs::generateIfExists(Route::currentRouteName());
		
	//set default pageTitle
	$pageTitle	= '';
	if(!empty($breadcrumbs)){
		$pageTitle = last($breadcrumbs)->title;
	}
	
	$view->with(array('pageTitle' => $pageTitle, 'breadcrumbs' => $breadcrumbs));
});

View::composer('main.navbar_side', function($view){
	//set menu items
	$menu = new App\Menu('sidebar', array(
		array('id' => 'dashboard', 'title' => Lang::get('views/main.dashboard'), 'url' => URL::route('index'), 'iconClass' => 'fa fa-th-large'),
		array('id' => 'contacts', 'title' => Lang::get('views/main.contacts'), 'url' => URL::route('contacts.index'), 'iconClass' => 'fa fa-user'),
		array('id' => 'settings', 'title' => Lang::get('views/main.settings'), 'url' => URL::route('settings.index'), 'iconClass' => 'fa fa-gear'),
        array(
            'id' => 'tests',
            'title' => 'Тесты',
            'url' => URL::route('tests.index'),
            'iconClass' => 'fa fa-pencil',
            'items' => null //can create new App\Menu for second level
        )
	));
	$view->with(array('menu' => $menu));
});

?>