/**
 * Created by damian on 31.10.14.
 */
define(['backbone', '../models/Error'], function(Backbone, Error){
   var ErrorView = Backbone.View.extend({
       tagName: 'p',
       className: 'text-danger',

       initialize: function(options){
           if(!options.model){
               this.model = new Error(options.modelData);
           }
           this.model.on('change', this.render());
       },

       render: function(){
           this.$el.html(this.model.get('message'));
       }
   });

    return ErrorView;
});
