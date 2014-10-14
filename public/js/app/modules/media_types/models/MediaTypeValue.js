/**
 * @class MediaTypeValue
 */
define(['backbone', 'MediaType'], function(Backbone, MediaType){
    var MediaTypeValue = Backbone.Model.extend({
        defaults: {
            mediaType: new MediaType(),
            value: ''
        }
    });

    return MediaTypeValue;
});