var require = {
	urlArgs: "bust=" + (new Date()).getTime(),
	baseUrl: '/js',
	paths: {
		'jquery': 			'libs/jquery-1.11.2',
		'bootstrap':		'libs/bootstrap.min',
		'inspinia':			'libs/inspinia',
		'backbone':			'libs/backbone',
		'underscore':		'libs/underscore',
        'jasmine':          'libs/jasmine/jasmine',
        'jasmine-html':     'libs/jasmine/jasmine-html',
        'jasmine-boot':     'libs/jasmine/boot',
		//Plugins
		'jqueryClock':		'libs/plugins/jquery.clock/js/jquery.clock',
		'jqueryMetisMenu':  'libs/plugins/metisMenu/jquery.metisMenu',
        'datatables': 'libs/plugins/dataTables/jquery.dataTables',
        'dropzone':         'libs/plugins/dropzone/dropzone',
		'text':				'libs/require.text',
		//Aliases
        'pages':            'app/pages',
		'modules':			'app/modules',
        'components':       'app/components',
        'tests':            'app/tests'
	},
	shim: {
		'jqueryClock': ['jquery'],
		'jqueryMetisMenu': ['jquery'],
		'bootstrap': ['jquery'],
		'inspinia': ['jquery', 'jqueryMetisMenu', 'bootstrap'],
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html'],
            exports: 'jasmine'
        }
	},
    map: {
        '*': {
            'css': 'libs/plugins/require-css/css'
        }
    },
	deps: ['inspinia', 'tools', 'pages/login'],
	waitSeconds: 0
};