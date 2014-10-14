define(['backbone', 'text!../templates/template.html'], function(Backbobe, Template){
	var ItemView = Backbone.View.extend({
		tagName:		'tr',
		readTemplate:	_.template($(Template).filter('#show_item').html()),
		editTemplate:	_.template($(Template).filter('#edit_item').html()),
		
		initialize: function(attributes, options){
		},
		
		events: {
			'click .edit': 		'showEdit',
			'click .cancel':	'cancelEdit',
			'click .save':		'save',
			'click .remove':	'destroy'
		},
		
		showEdit: function(){
			this.$el.html(this.editTemplate());
		},

		cancelEdit: function(){
			if(this.model.isNew()){
				this.model.collection.remove(this.model);
				this.remove();
			}
			else{
				this.showRead();
			}
		},
		
		showRead: function(){
			this.$el.html(this.readTemplate());
		},
		
		showError: function(message){
			var alert = this.$el.find('.alert');
			alert.parent('td').addClass('has-error');
			alert.removeClass('hidden').html(message);
		},
		
		clearError: function(message){
			var alert = this.$el.find('.alert');
			alert.parent('td').removeClass('has-error');
			alert.addClass('hidden').html('');
		},
		
		save: function(){
			var _this	= this;
			var newName	= this.$el.find('input').val();
			this.model.save({name: newName}, {
				success: function(model, response){
					if(response.status == 'ok'){
						_this.showRead();
					}
					else{
						_this.showError(response.error.message);
					}
				},
				error: function(model, xhr){
					_this.showError('Network error: ' + xhr.status + ' ' + xhr.statusText);
				}
			});
		},
		
		destroy: function(){
			var _this = this;
			this.model.destroy({
				wait: true,
				success: function(model, response){
					if(response.status == 'ok'){
						_this.remove();
					}
					else{
						_this.showError(response.message);
					}
				},
				error: function(model, xhr){
					_this.showError('Network error: ' + xhr.status + ' ' + xhr.statusText);
				}
			});
		},
		
		render: function(){
			if(this.model.isNew()){
				this.showEdit();
			}
			else{
				this.showRead();
			}
			
			return this;
		}
	});
	
	return ItemView;
});