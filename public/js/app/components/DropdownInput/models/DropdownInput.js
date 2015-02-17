define(['backbone'], function(Backbone){

    var setDefaultTypeId = function(model){
        model.set('typeId', model.getDefaultTypeId());
    };

    var setTypeName = function(model, id){
        var typeName = model.getTypeNameById(id);
        model.set('typeName', typeName);
    };

	var Model = Backbone.Model.extend({
		defaults: {
			typeId: 	'',
			typeName:	'',
			value:		'',
			types:		[]
		},
		
		initialize: function(){
            _.bindAll(this, 'getId', 'getDefaultTypeId', 'getTypeById', 'getTypeNameById');
            //если тип не установлен, устанавливаем тип по умолчанию
            if(!this.get('typeId')) {
                setDefaultTypeId(this);
            }
            setTypeName(this, this.get('typeId'));

            this.on('change:types', function(model){
                //при изменении типов, если в новом списке типов нет текущего типа - устанавливаем тип по умолчанию
                // и обновляем название типа
                var typeId = model.get('typeId');
                if(!model.getTypeById(typeId)) {
                    setDefaultTypeId(model);
                }else{
                    setTypeName(model, typeId);
                }
            });
            //при смене типа медиатипа - обновляем и название
			this.on('change:typeId', setTypeName);
		},
		
		getId: function(){
			return (this.get('id') || '');
		},

		getDefaultTypeId: function(){
			if(this.get('types').length > 0){
				return this.get('types')[0].id;
			}

			return '';
		},

        getTypeById: function(typeId){
            var type = false;
            this.get('types').forEach(function(t){
                if(t.id == typeId){
                    type = t;
                    return;
                }
            });

            return type;
        },
		
		getTypeNameById: function(typeId){
			var typeName = '';
            var type;
            if(type = this.getTypeById(typeId)){
                typeName = type.name;
            }
			return typeName;
		}
	});
	
	return Model;
});