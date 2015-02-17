define(['backbone', '../models/Column'], function(Backbobe, Column){

    var ColumnCollection = Backbone.Collection.extend({
        model: Column,

        initialize: function(models){

            this.on('change:sortOrder', this.changeSortOrder);

        },

        changeSortOrder: function(model, value, options){
            if(value) { //ignore sortOrder = ''
                this.resetAnotherModelsSortOrder(model);
            }
        },

        resetAnotherModelsSortOrder: function(currentModel){
            this.each(function(model){
                if(model !== currentModel){
                    model.set('sortOrder', '');
                }
            });
        }

    });

    return ColumnCollection;

});