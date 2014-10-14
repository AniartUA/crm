define([
        'backbone',
        'components/DropdownInput/component',
        'modules/media_types/collections/collection'
    ], function(Backbone, DropdownInputComponent, MediaTypeCollection){
    /**
     * @exports app/modules/contacts/views/EditContactView
     */
	var EditContactView = Backbone.View.extend({
		initialize: function(options){
            if(options.el){
                this.setElement(options.el);
            }
            this.mediaTypes = new MediaTypeCollection();
		},

        events: {

        },

		render: function() {
        }
	});
	
	return EditContactView;
});