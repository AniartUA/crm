/**
 * Created by damian on 31.10.14.
 */
define(['backbone', '../models/Error'], function(Backbone, Error){
    var ErrorCollection = Backbone.Collection.extend({
        model: Error
    });

    return ErrorCollection;
});
