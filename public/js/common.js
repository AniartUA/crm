require(['jquery', 'backbone', 'app'], function($, Backbone, Application){
    //добавляем событие для коллекций, которое срабатывает перед fetch запросом
	(function() {
		var fetch = Backbone.Collection.prototype.fetch;
		Backbone.Collection.prototype.fetch = function() {
			this.trigger('beforeFetch');
			return fetch.apply(this, arguments);
		};
	})();

    //Создаем и запускаем приложение
    var AniCRM = window.AniCRM = new Application();
    AniCRM.start();

    //инициализируем часы на верхней панели
   AniCRM.includeComponent('Clock', function(ClockComponent){
       var clock = new ClockComponent();
       $('#navbar_top_clock').append(clock.el());
   });
});
