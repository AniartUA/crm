define(['jquery', 'backbone', 'app/modules/core/Application', 'app/routes'], function($, Backbone, Application, AppRouter){
    /**
     * ==============================================
     * Немного расширим Backbone
     * ==============================================
     */
    //добавляем событие для коллекций, которое срабатывает перед fetch запросом
	(function() {
		var fetch = Backbone.Collection.prototype.fetch;
		Backbone.Collection.prototype.fetch = function() {
			this.trigger('beforeFetch');
			return fetch.apply(this, arguments);
		};
	})();
    //добавим в роутер функцию редиректа
    (function() {
       Backbone.Router.prototype.redirect = function(routeName){
           if(this.routes[routeName]){
               this.navigate(routeName);
               window.location.reload();
           }
           else{
               throw new Error('Routes name("'+ routeName +'") not defined', false);
           }
       }
    })();

    //Создаем и запускаем приложение
    var AniCRM = window.AniCRM = new Application({routerModel: AppRouter});
    AniCRM.start(function(){
        /**
         *============================
         * Общий функционал
         * ===========================
         */

        //Инициализируем и показываем часы в шапке
        require(['components/Clock/component'], function(ClockComponent){
            var clock = new ClockComponent();
            $('#navbar_top_clock').append(clock.el());
        });
        //Создаем Loader
        require(['components/Loader/component'], function(LoaderComponent){
            AniCRM.loader = new LoaderComponent();
            AniCRM.loader.el().appendTo('body');
        });
    });
});
