define([
    'backbone',
    './Paginate',
    'text!./template.html'
], function(Backbone, Paginate, Template){
    var PaginationView = Backbone.View.extend({
        template: _.template($(Template).filter('#active_table_pagination_view').html()),

        initialize: function(options){
            if(!(this.model instanceof Paginate)){
                this.model = new Paginate(this.model, {parse: true});
            }
        },

        render: function(){
            this.setElement(this.template({
                paginate: this.model
            }));

            return this;
        }

    });

    return PaginationView;
});
