define([
    'jquery', 'backbone',
    '../models/DropdownInput',
    'text!../templates/template.html'],
    function($, Backbone, DropdownInput, Template){
	var ItemView = Backbone.View.extend({
		tagName: 'div',
		className: 'input-group m-b',
		template: _.template($(Template).filter('#item').html()),

		initialize: function(options){
			_.bindAll(this,
                'render', 'changeValue', 'changeType',
                'setType', 'setValue'
            );

            if(!this.model){
                this.model = new DropdownInput();
            }

            this.listenTo(this.model, {
                'change:value': this.changeValue,
                'change:typeId': this.changeType,
                'remove': function(){
                    this.remove();
                }
            }, this);

 		},

        events: {
            "input": "setValue",
            "click li": "setType"
        },

        changeValue: function(model, value){
            this.$el.find('input').val(value);
        },

        changeType: function(model, typeId){
            this.$el.find('#' + this.cid + '_type_name').text(model.get('typeName'));
            this.$el.find('#' + this.cid + '_input').attr('name', 'type[' + typeId + '][' + model.getId() + ']');
        },
		
		setType: function(event){
			var typeId	= $(event.currentTarget).attr('data-id');
			this.model.set('typeId', typeId);
		},
		
		setValue: function(event){
			this.model.set('value', $(event.target).val());
        },

        focus: function(){
            this.$el.find('#' + this.cid + '_input').trigger('focus');
        },
		
		render: function(){
			this.$el.html(this.template());
			
			return this;
		}
	});
	
	return ItemView;
});