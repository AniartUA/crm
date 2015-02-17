define([
    'backbone',
    './AttachedFileView'
], function(Backbone, AttachedFileView){

    var AttachmentsView = Backbone.View.extend({
        tagName: 'div',
        className: 'attachments-list',

        initialize: function(){
            this.collection.on({
                'add': this.render,
                'remove': this.render,
                'reset': this.render
            }, this);
        },

        _renderAttachedFile: function(file){
            var attachedView = new AttachedFileView({model: file});
            return attachedView.render();
        },

        render: function(){
            this.$el.empty();
            this.collection.each(function(file){
                this.$el.append(this._renderAttachedFile(file).$el);
            }, this);
            return this;
        }

    });

    return AttachmentsView;
});