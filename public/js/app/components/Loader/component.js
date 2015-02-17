/**
 * Created by damian on 30.10.14.
 */
define(['modules/core/Component', './views/LoaderView'], function(Component, LoaderView){
    var LoaderComponent = Component.extend({
        name: 'Loader',
        view: LoaderView,
        defaults: {

        },
        initialize: function(params){
            this.render();
        },

        processResponse: function(response, options){
            return this.view.processResponse(response, options);
        },

        load: function(message, hideTime){
            this.view.load(message, hideTime);
        },

        notice: function(message, hideTime){
            this.view.notice(message, hideTime);
        },

        warning: function(message, hideTime){
            this.view.warning(message, hideTime);
        },

        error: function(message, hideTime){
            this.view.error(message, hideTime);
        },

        success: function(message, hideTime){
            this.view.success(message, hideTime)
        },

        hide: function(time){
            this.view.hide(time);
        },

        show: function(time){
            this.view.show(time);
        },

        appendTo: function(obj){
            return this.el().appendTo(obj);
        }
    });

    return LoaderComponent;
});