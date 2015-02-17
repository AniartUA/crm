define([
    'underscore'
], function(_){

    var deep = function(a, b) {
        return _.isObject(a) && _.isObject(b) ? _.extend(a, b, deep) : b;
    };

    var SortStrategy = {
        add: function(paramName, paramValue){
            var result = this.params[paramName] || paramValue;
            if(_.isArray(paramValue)){ //ex. ['-name', 'position']
                result = _.union(result, paramValue);
            }
            return result;
        },

        parse: function(paramValue){
            return paramValue.split('|');
        },

        join: function(paramValue){
            return paramValue.join('|');
        }
    };

    var FilterStrategy = {
        add: function(paramName, paramValue){
            var result = this.params[paramName] || paramValue;
            if(_.isObject(paramValue)){// ex. {name:['Andrew', 'Pavel'], position: ['pilot']}
                _.each(paramValue, function(value, name){
                    result[name] = _.union(result[name], value);
                });
            }
            return result;
        },
        parse: function(paramValue){
            var result = {};
            var filters = paramValue.split('|');
            _.each(filters, function(filter){
                filter = filter.split('::');
                result[filter.shift()] = filter;
            }, this);

            return result;
        },
        join: function(paramValue){
            var result = '';
            if(paramValue){
                var resultParams = [];
                _.each(paramValue, function(value, name){
                    resultParams.push(name+'::'+value.join('::'));
                });
                result += resultParams.join('|');
            }

            return result;
        }
    };

    var ItemsStrategy = {
        parse: function(paramValue){
            var pages = paramValue.split('-');
            return {
                from: pages[0],
                to:  pages[1]
            }
        },
        join: function(paramValue){
            var result = '';
            if(paramValue['from']){
                result+=paramValue['from'];
            }
            if(paramValue['to']){
                result+='-'+paramValue['to'];
            }

            return result;
        }
    };

    var Linker = function(options){
        this.baseUrl    = options.baseUrl || window.location.pathname;
        this.strategies = {};
        //default strategies;
        this.registerStrategies({
            sort:   SortStrategy,
            filter: FilterStrategy,
            items:  ItemsStrategy
        });
        this.params     = this.parse(window.location.search);
    };

    Linker.prototype.getLink = function(relUrl){
        relUrl = relUrl || '';
        var result = this.baseUrl + relUrl;
        if(!_.isEmpty(this.params)){
            result += '?';
            var resultParams = [];
            _.each(this.params, function(paramValue, paramName){
                var joiner = this.getStrategy(paramName, 'join');
                if(_.isFunction(joiner)){
                    resultParams.push(paramName + '=' + joiner.call(this, paramValue));
                }
                else{
                    resultParams.push(paramName + '=' + paramValue);
                }
            }, this);
            result += resultParams.join('&');
        }

        return result;
    };

    Linker.prototype.registerStrategy = function(name, strategy){
        var object = {};
        object[name] = strategy;
        _.extend(this.strategies, object);
    };

    Linker.prototype.registerStrategies = function(strategies){
        _.extend(this.strategies, strategies);
    };

    Linker.prototype.removeParams = function(params){
        params = params || [];
        this.params = _.omit(this.params, params);

        return this;
    };

    Linker.prototype.addParams = function(params, replace){
        params = params || {};
        replace = replace || false;
        if(replace){
            this.removeParams(_.keys(params));
        }
        _.each(params, function(paramValue, paramName){
            var adder = this.getStrategy(paramName, 'add');
            if(_.isFunction(adder)){
                this.params[paramName] = adder.call(this, paramName, paramValue);
            }
            else{
                if(_.isObject(paramValue)) {
                    _.extend(this.params[paramName], paramValue, deep);
                }
                else{
                    this.params[paramName] = paramValue;
                }
            }
        }, this);

        return this;
    };

    Linker.prototype.setParams = function(params){
        params = params || {};
        this.params = params;

        return this;
    };

    Linker.prototype.getParams = function(){
        return this.params;
    };

    Linker.prototype.getStrategy= function(name, func){
        func = func || '';
        var result = this.strategies[name];
        if(result && func){
            result = result[func];
        }
        return result;
    };

    Linker.prototype.parse = function(requestUri){
        var params = {};
        requestUri = requestUri.split('?')[1] || '';
        if(requestUri){
            var requestParts = requestUri.split('&');
            _.each(requestParts, function(requestPart){
                var paramParts = requestPart.split('=');
                var parser = this.getStrategy(paramParts[0], 'parse');
                if(_.isFunction(parser)){
                    params[paramParts[0]] = parser.call(this, paramParts[1]);
                }
                else{
                    params[paramParts[0]] = paramParts[1];
                }
            }, this);
        }
        return params;
    };

    return Linker;

});