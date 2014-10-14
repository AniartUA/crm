/**
 * Created by damian on 09.10.14.
 */
define(['backbone', './MediaTypeValueCollection', '../models/Messenger'], function(Backbone, MediaTypeValueCollection, Messenger){
   var MessengerCollection = MediaTypeValueCollection.extend({
      model: Messenger
   });

    return MessengerCollection;
});
