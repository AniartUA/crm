define([
    'backbone',
    '../collections/ColumnCollection',
    './ColumnView',
    'text!../template.html',
    'css!/css/plugins/dataTables/css/dataTables.bootstrap.css'
], function(Backbone, ColumnCollection, ColumnView, Template){

    var ActiveTableView = Backbone.View.extend({

        template: _.template($(Template).filter('#active_table_view').html()),

        initialize: function(options){
            this.initScheme(options.scheme);
            this.initRows(options.rows);
            this.pagination = options.pagination;
        },

        initScheme: function(scheme){
            this.scheme = scheme;
            this.scheme.get('columns').on({
                'change:sortOrder': this.sortColumn
            }, this);
        },

        initRows: function(rows){
            if(!(rows instanceof Backbone.Collection)){
                throw new TypeError('ActiveTable: rows must to be a Backbone.Collection');
            }
            this.rows = rows;
            //set collections events
            this.stopListening(this.rows, 'activeTable:');
            this.listenTo(this.rows, {
                'add': this.render,
                'remove': this.render,
                'reset': this.render
            });
        },

        sortColumn: function(column, sortOrder){
            if(sortOrder) {
                var sort = column.get('code');
                if(sortOrder == 'desc'){
                    sort = '-' + sort;
                }
                var data = {sort: sort};
                this.rows.fetch({
                    data: data,
                    url: '/api/v1/contacts',
                    reset: true,
                    success: function(rows, response){
                    }
                });
                AniCRM.router.navigate(this.rows.url + '?' + $.param(data));
            }
        },

        renderColumns: function(){
            var $columns = this.$el.find('thead tr');
            $columns.empty();
            this.scheme.get('columns').each(function(column){
                var columnView = new ColumnView({model: column});
                $columns.append(columnView.render().$el);
            }, this);
        },

        renderPagination: function(){
            this.$el.find('.active-table-pagination').html(this.pagination.render().$el);
        },

        render: function(){
            this.$el.empty().html(this.template({
                scheme: this.scheme,
                rows: this.rows
            }));
            this.renderColumns();
            if(this.pagination && this.pagination instanceof Backbone.View){
                this.renderPagination();
            }

            return this;
        }

    });

    return ActiveTableView;

});