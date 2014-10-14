define(['jquery', 'backbone', '../collections/collection', './item_view', 'text!../templates/template.html'], function($, Backbone, Collection, ItemView, Template){
	var ComponentView = Backbone.View.extend({
		tagName: 'div',
		template: _.template($(Template).filter('#collection').html()),
		isRender: false,
		
		initialize: function(options){
			this.collection = new Collection([], {
				typeCaption: options.typeCaption,
				types: options.types
			});
			this.collection.on('add', this.addItem, this);
			this.render();
			this.fillCollection(options.items);
		},
		
		fillCollection: function(items){
			//last element needs to by empty
			items.push({});
			if(_.isArray(items)){
				items.map(function(item){
					item.types = this.collection.types;
				}, this);
				this.collection.add(items);
			}			
		},
		
		addItem: function(model, collection){
			this.appendItem(model);
			model.on('change:value', function(){
				if(this.collection.getEmpty().length > 1){
					this.removeEmptyModels(model);
				}
				if(this.collection.getEmpty().length == 0){
 					this.collection.add({typeId: model.get('typeId'), types: model.get('types')});
				}
			}, this);
		},
		
		removeEmptyModels: function(){
			this.collection.getEmpty().forEach(function(model){
				this.remove(model);
			}, this.collection);
		},
		
		appendItem: function(model){
			var itemView = new ItemView({model: model});
			this.$el.find('#' + this.cid + '_items_container').append(itemView.render().el);
		},
		
		render: function(){
			if(!this.isRender){
				this.$el.html(this.template());
				this.isRender = true;
			}
			
			return this;
		}
	});
	
	return ComponentView;	
});