define(['backbone', '../models/DropdownInput'], function(Backbone, Model){

    /**
     * Если у модели не установлены типы, то типы берутся у её коллекции
     *
     * @param {Model} model
     * @param {Collection} collection
     * @private
     */
    var setCollectionTypesForModel = function(model, collection){
        if(collection.types){
            if(_.isEmpty(model.get('types'))){
                model.set('types', collection.types);
            }
        }
    };

    /**
     * @class
     */
	var Collection = Backbone.Collection.extend({
        /**@lends Collection*/
		model: Model,
		url: '/',
        types: [],

        /**
         *
         * @param models
         * @param options
         * @constructs
         */
        initialize: function(models, options){
            this.types  = options.types;
            for(var i in models){
                if(models[i] instanceof Backbone.Model){
                    setCollectionTypesForModel(models[i], this);
                }
                else{
                    models[i].types = this.types;
                }
            }
            this.on('add', setCollectionTypesForModel);
        },

        /**
         * Возврашает массив моделей у которых не установлено значение value
         *
         * @returns []
         */
		getEmpty: function(){
			return this.filter(function(item){
				return (item.get('value') == '' && item.get('value') !== 0);
			}, this);
		},

        /**
         * Удаляет пустые элементы из коллекции и возвращает количество удаленных элементов
         *
         * @returns Number count
         */
        removeEmpty: function(){
            var emptyModels = this.getEmpty();
            var count = emptyModels.length;
            if(count > 0){
                this.remove(emptyModels);
            }

            return count;
        },

        /**
         * Функция-компaратор для автоматической сортировки модели. Сортирует модели таки образом, чтобы модели с пустым
         * значением value всегда находились в конце коллекции
         * @param a  текущая модель
         * @param b  следующая модель
         * @private
         */
        comparator: function(a, b){
            if(b.get('value') === ''){
                return -1;
            }
            else if(a.get('value') === ''){
                return 1;
            }
            else{
                return 0;
            }
        }
	});
	
	return Collection;
});