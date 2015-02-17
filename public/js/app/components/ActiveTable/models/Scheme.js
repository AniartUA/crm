define(['backbone', '../collections/ColumnCollection'], function(Backbone, ColumnCollection){

    var Schema = Backbone.Model.extend({
        defaults:{
            model: null,
            columns: []
        },

        initialize: function(attributes){
            this._initColumns();
            this.on('change:columns', this._initColumns());
        },

        _initColumns: function(){
            var columns = this.get('columns');
            if(_.isArray(columns)){
                if(columns.length == 0){
                    var model = this.get('model');
                    model = new model();
                    _.each(model.attributes, function(value, key){
                        columns.push({code: key, title: key});
                    });
                }
                this.set('columns', new ColumnCollection(columns));
            }
        },

        modelValue: function(model, attrName){
            if(_.isFunction(this[attrName])){
                return this[attrName](model);
            }
            else{
                return model.get(attrName);
            }
        }

    });

    return Schema;
});