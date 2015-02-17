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
		},

        getTypeTitle: function(type){
            if(this.types[type]){
              return this.types[type].title;
            }
            return '';
        },

        getByType: function(type){
            return this.where({type: type});
        },

        phones: function(){
            return this.getByType('phone')
        },

        emails: function() {
            return this.getByType('email')
        },

        messengers: function(){
            return this.getByType('messenger')
        }
	});
	
	return Collection;
});