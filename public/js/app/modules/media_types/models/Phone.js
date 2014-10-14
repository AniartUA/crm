/**
 * Created by damian on 09.10.14.
 */
define(['backbone', './MediTypeValue', './MediaType'], function(Backbone, MediaTypeValue, MediaType){
    /**
     * @exports app/modules/media_type/models/Phone
     */
    var Phone = MediaTypeValue.extend({
       defaults:{
           mediaType: new MediaType(),
           value: ''
       }
    });

    return Phone;
});
