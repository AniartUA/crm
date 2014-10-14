/**
 * Created by damian on 09.10.14.
 */
define(['backbone', './MediaTypeValueCollection', '../models/Email'], function(Backbone, MediaTypeValueCollection, Email){
   var EmailCollection = MediaTypeValueCollection.extend({
      model: Email
   });

    return EmailCollection;
});
