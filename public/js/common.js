require(['jquery', 'anicrm', 'backbone'], function($, AniCRM, Backbone){
	(function() {
		var fetch = Backbone.Collection.prototype.fetch;
		Backbone.Collection.prototype.fetch = function() {
			this.trigger('beforeFetch');
			return fetch.apply(this, arguments);
		};
	})();
	AniCRM.initClock('#navbar_top_clock');
});
