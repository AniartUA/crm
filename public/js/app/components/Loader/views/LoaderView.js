/**
 * Created by damian on 30.10.14.
 */
define(['backbone', '../models/Loader',  'text!../templates/loader.html'], function(Backbone, Loader, Template){
   var LoaderView = Backbone.View.extend({
       tagName: 'div',
       className: 'loader',
       template: _.template($(Template).filter('#loader').html()),
       timeoutHandler: null,

       initialize: function(options){
           _.bindAll(this, 'onModelChange');
           if(!options.model){
               this.model = new Loader();
           }
           this.model.on('change', this.onModelChange);
       },

       onModelChange: function(model){
           this.render();
           if(model.get('status') == 'load'){
               this.$el.find('.loader-img').css('display', 'inline-block')
           }
           else{
               this.$el.find('.loader-img').css('display', 'none');
           }
           this.show();
       },

       processData: function(data, options) {
           var _this = this;
           var loader = !!(options.loader || data.data.loader);
           var loaderTimeout = (options.loaderTimeout || data.data.loaderTimeout) || 3000;
           if (data.status == 'error') {
               if (loader) {
                   _this.warning(data.message, loaderTimeout);
               }
           }
           else if (data.status == 'success') {
               if (loader) {
                   _this.success(data.message, loaderTimeout);
               }
           }
           else {
               if (loader) {
                   _this.error(data.message, loaderTimeout);
               }
           }
           if (_.isFunction(options[data.status])) {
               options[data.status].apply(_this, arguments);
           }
       },

       processJqXHR: function(response, options){
           options = options || {};
           var _this = this;
           response.always(function(jqxhr){
               var data = jqxhr.responseJSON || JSON.parse(jqxhr.responseText);
               _this.processData(data, options);
           });
       },

       processBackboneSync: function(options){
           var _this = this;
           var response = _.omit(options, 'success', 'error');
           _.extend(response, {
               success: function(entity, response){
                   _this.processData(response, _.omit(options, 'success'));
                   if(_.isFunction(options.success)){
                       options.success.apply(_this, arguments);
                   }
               },
               error: function(entity, xhr){
                   var data = xhr.responseJSON || JSON.parse(xhr.responseText);
                   _this.processData(data, _.omit(options, 'error', 'fail'));
                   if(_.isFunction(options.error)){
                       options.error.apply(_this, arguments);
                   }
               }
           });

           return response;
       },

       processResponse: function(response, options){
           /**
            * var jqxhr = $.post('/', {});
            * AniCRM.loader.processResponse(jqxhr, options);
            */
           if(response && response.promise){ //jqXHR
               return this.processJqXHR(response, options);
           }
           /**
            * model.save({}, AniCRM.loader.processResponse(options))
            */
           else{
               return this.processBackboneSync(response);
           }
       },

       /*
       processSuccess: function(response, hideTimeout){
           hideTimeout = hideTimeout || response.hideTimeout;
           var message = response.loaderMessage || 'Операция успешно выполнена';
           this.success(message, hideTimeout);
       },

       processError: function(xhr, hideTimeout){
           var errorMessage = '';
           if(xhr.responseJSON){
               errorMessage = xhr.responseJSON.loaderMessage;
           }
           else if(xhr.responseText){
               errorMessage = xhr.responseText;
           }

           if(!errorMessage){
               errorMessage = 'Ошибка[' + xhr.status + ']: ' + xhr.statusText;
           }
           this.error(errorMessage, hideTimeout);
       },
       */

       doAction: function(status, message, hideTime){
           clearTimeout(this.timeoutHandler);
           status = status || 'info';
           message = message || '';
           hideTime = hideTime || 0;

           this.model.set({
               status: status,
               text: message
           });
           if(!this.model.hasChanged()){ //for same requests (ex. delete files)
               this.model.trigger('change', this.model);
           }

           if(hideTime > 0){
               var _this = this;
              this.timeoutHandler = setTimeout(function(){
                  _this.hide();
              }, hideTime);
           }
       },

       load: function(message, hideTime){
           message = message || 'Загрузка...';
           this.doAction('load', message, hideTime);
       },

       notice: function(message, hideTime){
           this.doAction('info', message, hideTime);
       },

       warning: function(message, hideTime){
           this.doAction('warning', message, hideTime);
       },

       error: function(message, hideTime){
           this.doAction('danger', message, hideTime);
       },

       success: function(message, hideTime){
           this.doAction('success', message, hideTime);
       },

       hide: function(time){
           time = time || 250;
           this.$el.fadeOut(time);
       },

       show: function(time){
           time = time || 250;
           this.$el.fadeIn(time);
       },

       render: function(){
           this.$el.html(this.template(this.model.toJSON()));

           return this;
       }
   });

    return LoaderView;
});