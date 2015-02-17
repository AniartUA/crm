/**
 * Created by damian on 09.10.14.
 */
define(['backbone', 'modules/media_types/collections/MediaTypeValueCollection', '../models/Phone'], function(Backbone, MediaTypeValueCollection, Phone){
   var PhoneCollection = MediaTypeValueCollection.extend({
      model: Phone
   });

    return PhoneCollection;
});
