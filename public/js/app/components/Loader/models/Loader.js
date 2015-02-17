/**
 * Created by damian on 30.10.14.
 */
define(['backbone'], function(Backbone){
   var Loader = Backbone.Model.extend({
      defaults:{
          status: 'info', //info, load, success, warning, danger
          text: '&nbsp;'
      }
   });

    return Loader;
});