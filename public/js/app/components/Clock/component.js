define(['modules/core/Component', './views/ClockView'], function(Component, ClockView){
   var ClockComponent = Component.extend({
       name: 'Clock',
       view: ClockView,

       initialize: function(params){
           this.view.render();
       }
   });

    return ClockComponent;
});