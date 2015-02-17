define(['backbone'], function(Backbone){

    var ColumnView = Backbone.View.extend({
        tagName: 'th',

        initialize: function(){
            this.model.on('change:sortOrder', this.render, this);
        },

        events: {
            'click': 'toggleSorting'
        },

        toggleSorting: function(){
            if(this.model.get('sort')){
                var sortOrder = this.model.get('sortOrder');
                if(sortOrder){
                    sortOrder = (sortOrder == 'asc') ? 'desc' : 'asc';
                }
                else{
                    sortOrder = 'asc';
                }
                this.model.set('sortOrder', sortOrder);
            }
        },

        render: function(){
            var className = this.model.get('code') + ' ';
            if(this.model.get('sort')){
                className += 'sorting';
                if(this.model.get('sortOrder')) {
                     className += (this.model.get('sortOrder') == 'asc') ? '_asc' : '_desc';
                }
            }
            var div = $('<div>', {text: this.model.get('title')});
            this.$el.attr('class', className).html(div);

            return this;
        }

    });

    return ColumnView;

});