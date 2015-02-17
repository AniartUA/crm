define(['backbone', 'jquery'], function(Backbone, $){
	//constructor
	var Component = function(params){
		params || (params = {});
		params = _.defaults({}, params, _.result(this, 'defaults'));
		if(_.isObject(this.constructor.__super__)){
			params = _.defaults({}, params, _.result(this.constructor.__super__, 'defaults'));
		}
		this.params	= params;
		this.view	= (new this.view(this.params));
		this.initialize.apply(this, params);
	};

	//public params
	_.extend(Component.prototype, Backbone.Events, {
		name: 'DefaultComponent',
		view: null,
		defaults: {},
		params: {},
		
		initialize: function(){},
		
		el: function(){
			return this.view.$el;
		},

        render: function(){
            return this.view.render();
        },
		
		get: function(paramName){
			return this.params[paramName];
		},
		
		set: function(paramName, paramValue){
			this.params[paramName] = paramValue;
			
			return this;
		}
	});
	
	//set default Backbone extend function
	Component.extend = Backbone.Model.extend;

	return Component;
});

