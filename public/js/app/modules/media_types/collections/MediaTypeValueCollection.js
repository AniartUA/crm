/**
 * @class MediaTypeValueCollection
 */
define(['backbone', '../models/MediaTypeValue'], function(Backbone, MediaTypeValue){
   var MediaTypeValueCollection = new Backbone.Collection.extend({
       model: MediaTypeValue
   }) ;

    return MediaTypeValueCollection;
});