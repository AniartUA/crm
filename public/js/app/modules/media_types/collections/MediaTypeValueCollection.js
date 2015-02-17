define(['backbone', '../models/MediaTypeValue'], function(Backbone, MediaTypeValue){
    /**
     * @class
     * @abstract
     * @augments Backbone.Collection
     */
    var MediaTypeValueCollection = Backbone.Collection.extend({
        model: MediaTypeValue
    }) ;

    return MediaTypeValueCollection;
});