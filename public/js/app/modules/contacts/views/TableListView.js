define([
    'backbone',
    '../collections/ContactCollection',
    'datatables',
    'css!/css/plugins/dataTables/css/dataTables.bootstrap.css',
    //'css!/css/plugins/dataTables/css/jquery.dataTables.min.css',
], function(Backbone, ContactCollection){

    var TableListView = Backbone.View.extend({
        tagName: 'div',

        initialize: function(options){
            this.dataTable = this.$el.DataTable({
                order: [[0, 'desc']],
                //processing: true,
                //serverSide: true,
                //ajax: '/contacts'
            });
            console.log(this.dataTable);
            this._initCollection();
        },

        _initCollection: function(){
            this.collection.on('add', function(model){
                this.dataTable.row.add([
                    model.get('updated_at'),
                    model.getHtmlEditLink(),
                    model.get('position'),
                    model.getMediaTypeValues('phones').join('<br />'),
                    model.getMediaTypeValues('emails').join('<br />'),
                    model.getMediaTypeValues('messengers').join('<br />')
                ]).draw();
            }, this);

            this.collection.each(function(model){
                this.trigger('add', model, this)
            }, this.collection);
        },

        render: function(){
            return this;
        }

    });

    return TableListView;
});