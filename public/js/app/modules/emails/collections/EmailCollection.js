/**
 * Created by damian on 09.10.14.
 */
define([
    'backbone',
    'modules/media_types/collections/MediaTypeValueCollection',
    '../models/Email'
    ],
    function(Backbone, MediaTypeValueCollection, Email){
        var EmailCollection = MediaTypeValueCollection.extend({
            model: Email,

            initialize: function(){
                //console.log(arguments[0]);
            }
        });

        return EmailCollection;
});
