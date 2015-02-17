define(['modules/core/Component', './views/DropdownInputMultipleView'], function(Component, ComponentView){
	var DropdownInput = Component.extend({
		name: 'DropdownInput',
		view: ComponentView,
		defaults: {
			typeCaption: 'Новое поле',
			types: [],
			items: []
		},
		
		initialize: function(options){

		},

        getTypes: function(){
            return this.view.collection.types;
        },

        getItems: function(){
            return this.view.collection.models;
        },

        onChange: function(callback){
            if(typeof callback == 'function'){
                this.view.collection.each(function(model){
                    model.on('change:typeId change:value', callback);
                });
                this.view.collection.on('add', function(model){
                   model.on('change:typeId change:value', callback);
                });
            }
        }
	});
	
	return DropdownInput;
});