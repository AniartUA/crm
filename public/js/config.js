var require = {
	urlArgs: "bust=" + (new Date()).getTime(),
	baseUrl: '/public/js',
	paths: {
		'jquery': 			'libs/jquery-1.10.2',
		'bootstrap':		'libs/bootstrap.min',
		'inspinia':			'libs/inspinia',
		'backbone':			'libs/backbone',
		'underscore':		'libs/underscore',
		//Plugins
		'jqueryClock':		'libs/plugins/jquery.clock/js/jquery.clock',
		'jqueryMetisMenu':  'libs/plugins/metisMenu/jquery.metisMenu',
		'text':				'libs/require.text',
		//Aliases
		'modules':			'app/modules'			
	},
	shim: {
		'jqueryClock': ['jquery'],
		'jqueryMetisMenu': ['jquery'],
		'bootstrap': ['jquery'],
		'inspinia': ['jquery', 'jqueryMetisMenu', 'bootstrap'],
	},
	deps: ['inspinia', 'common'],
	waitSeconds: 0
};