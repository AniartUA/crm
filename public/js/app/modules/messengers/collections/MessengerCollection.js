/**
 * Created by damian on 09.10.14.
 */

define(['backbone', 'modules/media_types/collections/MediaTypeValueCollection', '../models/Messenger'], function(Backbone, MediaTypeValueCollection, Messenger){
   var MessengerCollection = MediaTypeValueCollection.extend({
      model: Messenger
   });

    return MessengerCollection;
});
