define(['backbone', '../models/MediaType'], function(Backbone, MediaType){
	var Collection = Backbone.Collection.extend({
		model: MediaType,
		url: '/settings/mediatypes',
		
		initialize: function(models, options){
            this.normalUrl	= this.fetchUrl = this.url;
            if(options && options.type) {
                this.type = options.type;
                this.fetchUrl	+= '?type=' + this.type;
            }

			this.on('beforeFetch', function(){
				this.url = this.fetchUrl;
			});
			
			this.on('sync', function(){
				this.url = this.normalUrl;
			})
		}
	});
	
	return Collection;
});