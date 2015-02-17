define([
    'backbone',
    '../models/Contact'
], function(Backbone, Contact){

    var ContactCollection = Backbone.Collection.extend({

        model: Contact,
        url:'/contacts',

        parse: function(response, options){
            if(response.data){
                response = response.data;
                if(response.data){
                    response = response.data;
                }
            }
            return response;
        }

    });

    return ContactCollection;

});