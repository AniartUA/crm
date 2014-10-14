define(['backbone'], function(Backbone){
	var Model = Backbone.Model.extend({
		defaults: {
			typeId: 	0,
			typeName:	'',
			value:		'',
			types:		[]
		},
		
		initialize: function(){
			this.on('change:typeId', this.changeTypeId);
			if(_.isEmpty(this.get('types')) && this.collection){
				this.set('types', this.collection.types);
			}
			if(!this.get('typeId')){
				this.set('typeId', this.getDefaultTypeId());
			}
			this.changeTypeId(this, this.get('typeId'));
		},
		
		getId: function(){
			return (this.get('id') || '');
		},
		
		changeTypeId: function(model, value){
			var typeName = model.getTypeNameById(value);
			this.set('typeName', typeName);
		},
		
		getDefaultTypeId: function(){
			if(this.get('types').length > 0){
				return this.get('types')[0].id;
			}
			
			return 0;
		},
		
		getTypeNameById: function(typeId){
			var typeName = '';
			this.get('types').forEach(function(type){
				if(type.id == typeId){
					typeName = type.name;
				}
			});
			
			return typeName;
		}
	});
	
	return Model;
});