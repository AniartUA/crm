define(['backbone'], function(Backbone){

    function applyToConstructor(constructor, argArray) {
        var args = [null].concat(argArray);
        var factoryFunction = constructor.bind.apply(constructor, args);
        return new factoryFunction();
    }

    function objectName(obj, sufix){
        var objectName = obj.constructor.name || 'Object';
        if(_.isNumber(sufix)){
            sufix  = '#' + sufix;
        }

        return objectName + sufix;
    }

    var Application = function(settings){
        this.models         = {};
        this.collections    = {};
        this.views          = {};
        this.started        = false;
        this.params         = {};
        this.settings = _.extend({
            routerModel: null
        }, settings);
    };

    Application.prototype = {
        create: function(entityClass, entityId){
            var args = Array.prototype.slice.call(arguments, 2);
            var entityObject = applyToConstructor(entityClass, args);

            if(entityObject instanceof Backbone.Model){
                entityId = entityId || objectName(entityObject, _.size(this.models));
                return this.models[entityId] = entityObject;
            }
            else if(entityObject instanceof  Backbone.Collection){
                entityId = entityId || objectName(entityObject, _.size(this.collections));
                return this.collections[entityId] = entityObject;
            }
            else if(entityObject instanceof Backbone.View){
                entityId = entityId || objectName(entityObject, _.size(this.views));
                return this.views[entityId] = entityObject;
            }
            else{
                entityId = entityId || objectName(entityObject, _.size(this.params));
                return this.params[entityId] = entityObject;
            }
        },
        start: function(callback){
            if(this.settings.routerModel) {
                this.router = new this.settings.routerModel;
                Backbone.history.start({pushState: true});
            }

            if(typeof callback == 'function'){
                callback.apply(this);
            }
            this.started = true;
        },

        redirect: function(url){
            if(_.isString(url)){
                url = '/' + url.replace('/', '');
                window.location = url;
            }
            window.location.reload();
        },

        set: function(paramName, paramValue){
            this.params[paramName] = paramValue;
        },

        has: function(paramName){
            return !_.isUndefined(this.params[paramName]);
        },

        getModel: function(modelId){
            modelId = modelId || 0;
            return this.models[modelId];
        },

        getCollection: function(collectionId){
            collectionId = collectionId || 0;
            return this.collections[collectionId];
        },

        getView: function(viewId){
            viewId = viewId || 0;
            return this.views[viewId];
        },

        get: function(paramName, defaultValue){
            if(paramName){
                var value = this.params[paramName];
                if(_.isUndefined(value) && !_.isUndefined(defaultValue)){
                    value = defaultValue;
                }
                return value;
            }
            return this.params;
        },

        loadCss: function(url){
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    };

    return Application;
});