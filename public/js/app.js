define(['app/routes'], function(AppRouter){
    var Application = function(){
        this.started = false;
        this.params = {};
        this.readyCallbacks = [];
    };

    Application.prototype = {
        start: function(){
            this.router = new AppRouter();
            Backbone.history.start({pushState: true});

            if(this.readyCallbacks.length > 0){
                this.readyCallbacks.forEach(function(callback){
                   callback();
                });
            }

            this.started = true;
        },

        includeComponent: function(){
            var path = 'app';
            if(arguments.length == 3){
                var moduleName		= arguments[0];
                var componentName	= arguments[1];
                var callback		= arguments[2];

                path += '/modules/' + moduleName;
            }
            else{
                var componentName	= arguments[0];
                var callback		= arguments[1];
            }
            path += '/components/' + componentName + '/component';

            require([path], callback);
        },

        set: function(paramName, paramValue){
            this.params[paramName] = paramValue;
        },

        get: function(paramName){
            if(paramName){
                return this.params[paramName];
            }
            return this.params;
        },

        ready: function(callback){
            if(typeof callback == 'function'){
                this.readyCallbacks.push(callback);
            }
        }
    };

    return Application;
});