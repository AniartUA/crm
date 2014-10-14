define(['app/Component', './views/component_view'], function(Component, ComponentView){
	var DropdownInput = Component.extend({
		name: 'DropdownInput',
		view: ComponentView,
		defaults: {
			typeCaption: 'Новое поле',
			types: [],
			items: []
		},
		
		initialize: function(options){
		}
	});
	
	return DropdownInput;
});