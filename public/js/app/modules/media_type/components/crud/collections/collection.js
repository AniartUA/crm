define(['backbone', '../../../models/MediaType'], function(Backbone, MediaType){
	var Collection = Backbone.Collection.extend({
		model: MediaType,
		url: '',
		
		initialize: function(models, options){
			this.type 		= options.type;
			this.url		= options.url;
			this.normalUrl	= options.url;
			this.fetchUrl	= options.url + '?type=' + options.type;
		
			this.on('beforeFetch', function(){
				this.url = this.fetchUrl;
			});
			
			this.on('sync', function(){
				this.url = this.normalUrl;
			})
		},
	});
	
	return Collection;
});