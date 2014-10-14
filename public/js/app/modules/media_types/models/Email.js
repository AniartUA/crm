/**
 * Created by damian on 09.10.14.
 */
define(['backbone', './MediTypeValue', './MediaType'], function(Backbone, MediaTypeValue, MediaType){
    /**
     * @exports app/modules/media_type/models/Email
     */
    var Email = MediaTypeValue.extend({
       defaults:{
           mediaType: new MediaType(),
           value: ''
       }
    });

    return Email;
});
