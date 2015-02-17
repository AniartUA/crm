define([
   'backbone'
], function(Backbone){

    var Paginate = Backbone.Model.extend({

        defaults:{
            total: 1, //всего страниц
            perPage: 1, // к-во записей на одну страницу
            currentPage: 1, //текущая страница
            lastPage: 1, //последняя страница
            pagesCount: 5, //сколько показывать кнопок страниц
            from: 1, // нижний порог текущих записей
            to: 1 // верзхний порог текущих записей
        },

        initialize: function(){
            this.recalc();
            this.on('change', this.recalc)
        },

        recalc: function(){
            var half = Math.ceil(this.get('pagesCount') / 2);
            var fromPage = this.get('currentPage') - half;
            if(fromPage < 1){
                fromPage = 1;
            }
            var toPage = this.get('currentPage') + half;
            if(toPage > this.get('lastPage')){
                toPage = this.get('lastPage');
            }
            this.set('fromPage', fromPage);
            this.set('toPage', toPage);
        },

        parse: function(response){
            return {
                total: response.total,
                perPage: response.per_page,
                currentPage: response.current_page,
                lastPage: response.last_page,
                from: response.from,
                to: response.to
            }
        }
    });

    return Paginate;

});