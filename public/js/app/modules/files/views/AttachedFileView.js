define([
    'backbone'
], function(Backbone){

    var AttachedFileView = Backbone.View.extend({
        tagName: 'div',
        className: 'attached-file',
        template: _.template(
            '<i class="fa fa-paperclip" style="font-size:20px">&nbsp;</i>' +
            '<a target="_blank" href="/<%- src %>"><%- name %></a>' +
            '<i class="fa fa-times file-remove" ></i>'
        ),

        events: {
            'click .file-remove': 'destroy'
        },

        destroy: function(){
            this.model.destroy(AniCRM.loader.processResponse({
                wait: true,
                hideTimeout: 1000
            }));
        },

        render: function(){
            this.$el.html(this.template({
                src:    this.model.get('src'),
                name:   this.model.getNameWithSize()
            }));
            return this;
        }

    });

    return AttachedFileView;
});