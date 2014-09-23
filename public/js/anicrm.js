define(['jquery', 'backbone', 'jqueryClock'], function($, Backbone){

	AniCRM = Backbone.Model.extend({
		initClock: function(selector){
			var elements = $(selector);
			if(elements.length > 0){
				elements.each(function(){
					$this = $(this);
					$this.append(
						$('<span>', {'class': 'hour'}),
						$('<span>', {'class': 'min'}),
						$('<span>', {'class': 'sec'})
					);
					$this.clock({type: 'digit'});
				});
			}
		},
		
		hereDoc: function hereDoc(f){
			return f.toString().
			replace(/^[^\/]+\/\*!?/, '').
			replace(/\*\/[^\/]+$/, '');
		},
		
		includeComponent: function(){
			var path = 'app';
			if(arguments.length = 3){
				var moduleName		= arguments[0];
				var componentName	= arguments[1];
				var callback		= arguments[2];
				
				path += '/modules/' + moduleName;
			}
			else{
				var componentName	= arguments[0];
				var callback		= arguments[1];
			}
			path += '/components/' + componentName + '/component';

			require([path], callback);
		}
	});

	return new AniCRM;
});