//console.log(require.s.contexts._.config);
define(
	[
	 	'jquery', 
	 	'backbone', 
	 	'./collections/collection',
	 	'./views/item_view',
	 	'text!./templates/template.html'
	], 
	function($, Backbone, Collection, ItemView, Template){
	var ComponentView = Backbone.View.extend({
		tagName: 'div',
		className: 'panel-body',
		template: _.template($(Template).filter('#main').html()),
		type: '',

		initialize: function(options){
			this.type = options.type;

			_.bindAll(this, 'render', 'addItem', 'renderItem', 'networkError');
			
			if(!_.isObject(this.collection)){
				this.collection = new Collection([], {
					type: options.type,
					url: options.url
				});
			}
			
			this.collection.on('add', this.renderItem);
			this.collection.fetch({
				error: this.networkError
			});
		},
		
		events: {
			'click .add': 'addItem'
		},
		
		networkError: function(model, response){
			this.showError('Network error: ' + response.status + ' ' + response.statusText);
			this.$el.find('.add').attr('disabled', true);
		},
		
		showError: function(message){
			this.$el.find('tr.alert').removeClass('hidden').find('td').html(message);
		},
		
		addItem: function(){
			this.collection.add({});
		},
		
		renderItem: function(model, collection, options){
			var view = new ItemView({model: model});
			this.$el.find('table tbody').prepend(view.render().el);
			if(model.isNew()){
				model.set('type', this.type);
			}
		},
		
		render: function(){
			this.$el.html(this.template);
			
			return this;
		}
	});
	
	return ComponentView;
});