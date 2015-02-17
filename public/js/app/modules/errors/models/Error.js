/**
 * Created by damian on 31.10.14.
 */
define(['backbone'], function(Backbone){
   var Error = Backbone.Model.extend({
       defaults:{
           code: '',
           message: '',
           additional: {}
       },

       additional: function(key){
           var additional = this.get('additional');
           if(_.isUndefined(additional[key])){
               return '';
           }
           return additional[key];
       }
   });

    return Error;
});