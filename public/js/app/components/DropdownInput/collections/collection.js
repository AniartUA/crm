define(['backbone', '../models/DropdownInput'], function(Backbone, Model){
	var Collection = Backbone.Collection.extend({
		model: Model,
		url: '/',
		types: [],
		
		initialize: function(models, options){
			this.types = options.types;			
			this.typeCaption = options.typeCaption;
		},
		
		getEmpty: function(){
			return this.filter(function(item){
				return (item.get('value') == '' && item.get('value') !== 0);
			}, this);
		},
	});
	
	return Collection;
});