define(['backbone'], function(Backbone){
	var MediaType = Backbone.Model.extend({
		defaults:{
			name: '',
			type: ''
		}
	});
	
	return MediaType;
});