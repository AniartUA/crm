/**
 * Created by damian on 09.10.14.
 */
define(['backbone', 'modules/media_types/models/MediaTypeValue'], function(Backbone, MediaTypeValue){
    /**
     * @exports app/modules/media_type/models/Email
     */
    var Email = MediaTypeValue.extend({
        defaults:{
            mediaTypeId: 0,
            value: ''
        },
        parse: function(response){
            return {
                id: response.id,
                value: response.email,
                mediaTypeId: response.media_type_id
            }
        }
    });

    return Email;
});
