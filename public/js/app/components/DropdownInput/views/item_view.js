define(['jquery', 'backbone', 'text!../templates/template.html'], function($, Backbone, Template){
	var ItemView = Backbone.View.extend({
		tagName: 'div',
		className: 'input-group m-b',
		template: _.template($(Template).filter('#item').html()),
		
		initialize: function(){
			_.bindAll(this, 'render');
			this.model.on('remove', function(){
				this.remove();
			}, this);
		},
		
		initTemplate: function(template, callback){
			if(!template){
				var _this = this;
				require(['text!../templates/template.html'], function(Template){
					_this.template = _.template($(Template).filter('#item').html());
					callback.apply(_this);
				});
			}
			else{
				this.template = template;
				callback.apply(this);
			}
		},
		
		events: function(){
			var events = {
				"keyup input": 		"changeValue",
			};
			events["click #" + this.cid + "_type_list li"] = "changeType";
			
			return events;
		},
		
		changeType: function(event){
			var typeId	= $(event.currentTarget).attr('data-id');

			this.model.set('typeId', typeId);
			this.$el.find('#' + this.cid + '_type_name').text(this.model.get('typeName'));
			this.$el.find('#' + this.cid + '_input').attr('name', 'type[' + typeId + '][' + this.model.getId() + ']')
		},
		
		changeValue: function(event){
			this.model.set('value', $(event.target).val());
		},
		
		render: function(){
			this.$el.html(this.template());
			
			return this;
		}
	});
	
	return ItemView;
});